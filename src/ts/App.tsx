import React, {FC, useState, useEffect, useRef} from 'react'
import "../sass/styles.scss"
import * as esbuild from 'esbuild-wasm'
import { unpkgRedir } from '../plugins/unpkgRedir'
import { fetchPlugin } from '../plugins/fetch-plugin'

const App : FC = () => {
  const ref = useRef<any>()
  const iframe = useRef<any>()
  const [input, setInput] = useState('')

  const onClick = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (ref.current) {
      iframe.current.srcdoc = html
      const result = await ref.current.build({
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
      iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
    }
  }

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
  }

  useEffect(() => {
    startService()
  }, [])

  
  const html = `
  <html>
    <head />
      <body>
        <div id='root'></div>
        <script>
          window.addEventListener('message', (event) => {

            try {
              eval(event.data)
            }
            catch (err) {
              document.querySelector('#root').innerHTML = '<div id="cb-error" style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
            }
            
          }, false)
        </script>
      </body
    </html>
`

  return (
    <div>
      <textarea value={input} onChange={e => {setInput(e.target.value)}} />
      <div>
        <button onClick={e => {onClick(e)}}>Submit</button>
      </div>
      <iframe title='code preview' ref={iframe} sandbox='allow-scripts' srcDoc={html}/>
      </div>
  )
}

export default App
