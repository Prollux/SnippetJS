import * as esbuild from 'esbuild-wasm'
import { unpkgRedir } from '../plugins/unpkgRedir'
import { fetchPlugin } from '../plugins/fetch-plugin'

let service:esbuild.Service
const bundler = async (input:string) => {
    if (!service) {
        service = await esbuild.startService({
            worker: true,
            wasmURL: './esbuild.wasm'
        })
    } 

    const result = await service.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window'
        },
        plugins: [
          unpkgRedir(),
          fetchPlugin(input)
        ]
      })

      return result.outputFiles[0].text
}

export default bundler