import React, {FC, useState, useEffect, useRef} from 'react'
import "../sass/styles.scss"
import * as esbuild from 'esbuild-wasm'
import { unpkgRedir } from '../plugins/unpkgRedir'
import { fetchPlugin } from '../plugins/fetch-plugin'

const App : FC = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const onClick = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (ref.current) {
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

      setCode(result.outputFiles[0].text)

      try {
        eval(code)
      } catch(err) {
        alert(err)
      }
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

  return (
    <div>
      <textarea value={input} onChange={e => {setInput(e.target.value)}} />
      <div>
        <button onClick={e => {onClick(e)}}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe src='../codebox.html'></iframe>
    </div>
  )
}

export default App
