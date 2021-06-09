import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localForage from 'localforage'

const cache = localForage.createInstance({
    name: 'cache'
});

export const unpkgRedir = () => {
    return {
        name: 'unpkg-redirect-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                //console.log('onResolve', args)
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
                //console.log('onLoad', args)


                if (args.path === 'index.js') {
                    //console.log(args)
                    return {
                        loader: 'jsx',
                        contents: `
                            const message = require('nested-test-pkg')
                            console.log(message)
                        `,
                    }

                } else {
                    const cachedItem = await cache.getItem(args.path)
                    if (cachedItem) {
                        return cachedItem
                    }

                    const { data, request } = await axios.get(args.path)
                    const result = {
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