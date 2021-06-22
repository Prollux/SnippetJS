import * as esbuild from 'esbuild-wasm'
import { unpkgRedir } from '../plugins/unpkgRedir'
import { fetchPlugin } from '../plugins/fetch-plugin'

interface Bundle {
  code:string;
  err: string;
}


let service:esbuild.Service
const bundler = async (input:string) => {
    if (!service) {
        service = await esbuild.startService({
            worker: true,
            wasmURL: './esbuild.wasm'
        })
    } 
    let result:Bundle
    try {
      const bundle = await service.build({
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
      result = {
        code: bundle.outputFiles[0].text,
        err: '',
      }
    }
      catch (err) {
        result = {
          code: '(() => {})()',
          err: err.message
        }
    }
    return result
}

export default bundler