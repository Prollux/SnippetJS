import React, {FC, useState, useEffect, useRef} from 'react'
import "../sass/styles.scss"
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import * as esbuild from 'esbuild-wasm'
import { unpkgRedir } from '../plugins/unpkgRedir'
import { fetchPlugin } from '../plugins/fetch-plugin'
import CodeEditor from './components/CodeEditor'
import Preview from './components/Preview'

const App : FC = () => {
  const ref = useRef<any>()
  const iframe = useRef<any>()
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
    <>
    <div id='preview-container'>
      <CodeEditor value={input} onChange={(value:string)=> setInput(value)} />
      <Preview code={code} />
      </div>
      <button id='code-submit' onClick={e => {onClick(e)}}>Submit</button>
</>
  )
}

export default App
