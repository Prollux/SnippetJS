import * as esbuild from 'esbuild-wasm'
import localForage from 'localforage';

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