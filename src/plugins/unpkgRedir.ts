import * as esbuild from 'esbuild-wasm'


export const unpkgRedir = () => {
    return {
        name: 'unpkg-redirect-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /(^index\.js$)/}, () => {
                return {
                    namespace: 'a',
                    path: 'index.js'
                }
            })

            build.onResolve({ filter: /^\.+\//}, (args) => {
                return {
                    namespace: 'a',
                    path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
                }
            })

            build.onResolve({ filter: /.*/ }, async (args: any) => {    
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            })
        }
    }
}