import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import { urlencoded } from 'express'

export const unpkgRedir = () => {
    return {
        name: 'unpkg-redirect-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log('onResolve', args)
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
                    const { data, request } = await axios.get(args.path)
                    return {
                        loader: 'jsx',
                        contents: data,
                        resolveDir: new URL('./', request.responseURL).pathname
                    }
                }
            })
        }
    }
}