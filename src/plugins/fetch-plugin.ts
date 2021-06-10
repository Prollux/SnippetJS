import * as esbuild from 'esbuild-wasm'
import localForage from 'localforage'
import axios from 'axios'

const cache = localForage.createInstance({
    name: 'cache'
});

export const fetchPlugin = (input:string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {

            build.onLoad({ filter: /(^index\.js$)/}, () => {
                return {
                    loader: 'jsx',
                    contents: input,
                }
            })

            build.onLoad({ filter: /.*/}, async (args:any) => {
                const cachedItem= await cache.getItem<esbuild.OnLoadResult>(args.path)
                if (cachedItem) {
                 return cachedItem
                }
            })

            build.onLoad({ filter: /^.css$/}, async (args:any) => {
                const { data, request } = await axios.get(args.path)
                const escapedData = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'")
                const contents =   
                    `
                        const style = document.createElement('style');
                        style.innerText = '${escapedData}';
                        document.head.appendChild(style)
                    `
                const result:esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname
                }
                await cache.setItem(args.path, result)
                return result
            })

            build.onLoad({ filter: /.*/ }, async(args:any) => {

                const { data, request } = await axios.get(args.path)

                const result:esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname
                }
                await cache.setItem(args.path, result)
                return result
            })
        }
    }
}