import React, {FC, useState, useEffect, useRef} from 'react'
import "../sass/styles.scss"
import * as esbuild from 'esbuild-wasm'

const App : FC = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const onClick = (e) => {
    e.preventDefault()
    if (ref.current) {
      console.log(ref.current)
    }
  }

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
    console.log(ref.current)
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
