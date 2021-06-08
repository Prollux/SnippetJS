import * as esbuild from 'esbuild-wasm'
import axios from 'axios'

export const unpkgRedir = () => {
    return {
        name: 'unpkg-redirect-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log('onResolve', args)
                if (args.path === 'index.js') {
                    return { path: args.path, namespace: 'a' }
                }
                return {
                    path: (args.importer.substring(0,5) !== 'https' ? `https://unpkg.com/${args.path}` : `${args.importer}/${args.path}`),
                    namespace: 'a'
                }
            })

            build.onLoad({ filter: /.*/ }, async(args:any) => {
                console.log('onLoad', args)

                if (args.path === 'index.js') {
                    console.log(args)
                    return {
                        loader: 'jsx',
                        contents: `
                            const message = require('medium-test-pkg')
                            console.log(message)
                        `,
                    }
                } else {
                    let { data } = await axios.get(args.path)
                    return {
                        loader: 'jsx',
                        contents: data
                    }
                }
            })
        }
    }
}