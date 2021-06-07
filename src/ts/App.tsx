import React, {FC, useState, useEffect, useRef} from 'react'
import "../sass/styles.scss"
import * as esbuild from 'esbuild-wasm'

const App : FC = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const onClick = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (ref.current) {
      const result = await ref.current.transform(input, {
        loader: 'jsx',
        target: 'es2015'
      })
      setCode(result.code)
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
    </div>
  )
}

export default App
