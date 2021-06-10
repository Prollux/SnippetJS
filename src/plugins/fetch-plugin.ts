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
            build.onLoad({ filter: /.*/ }, async(args:any) => {
                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: input,
                    }

                } else {
                    // const cachedItem= await cache.getItem<esbuild.OnLoadResult>(args.path)
                    // if (cachedItem) {
                    //     return cachedItem
                    // }

                    const { data, request } = await axios.get(args.path)
                    const fileType = args.path.match(/.css$/) ? 'css' : 'jsx'
                    const escapedData = data
                        .replace(/\n/g, '')
                        .replace(/"/g, '\\"')
                        .replace(/'/g, "\\'")
                    const contents = fileType === 'css' ?   
                        `
                            const style = document.createElement('style');
                            style.innerText = '${escapedData}';
                            document.head.appendChild(style)
                        `
                         : data

                    const result:esbuild.OnLoadResult = {
                        loader: 'jsx',
                        contents,
                        resolveDir: new URL('./', request.responseURL).pathname
                    }
                    await cache.setItem(args.path, result)
                    return result
                }
            })
        }
    }
}