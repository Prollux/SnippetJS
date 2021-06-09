import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localForage from 'localforage'

const cache = localForage.createInstance({
    name: 'cache'
});

export const unpkgRedir = (input:string) => {
    return {
        name: 'unpkg-redirect-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                if (args.path === 'index.js') {
                    return {
                        namespace: 'a',
                        path: args.path 
                    }
                }
                if (args.path.includes('./') || args.path.includes('../')) {
                    return {
                        namespace: 'a',
                        path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
                    }
                }
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            })
            build.onLoad({ filter: /.*/ }, async(args:any) => {


                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: input,
                    }

                } else {
                    const cachedItem= await cache.getItem<esbuild.OnLoadResult>(args.path)
                    if (cachedItem) {
                        return cachedItem
                    }

                    const { data, request } = await axios.get(args.path)
                    const result:esbuild.OnLoadResult = {
                        loader: 'jsx',
                        contents: data,
                        resolveDir: new URL('./', request.responseURL).pathname
                    }
                    await cache.setItem(args.path, result)
                    return result
                }
            })
        }
    }
}