import React, {FC, useState, useEffect} from 'react'
import "../sass/styles.scss"
import * as esbuild from 'esbuild-wasm'

const App : FC = () => {
  const onClick = (e) => {
    e.preventDefault()
    console.log(input)
  }
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
    console.log(service)
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
      <pre></pre>
    </div>
  )
}

export default App
