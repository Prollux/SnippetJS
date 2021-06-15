import React, {FC, useState, useEffect, useRef} from 'react'
import "../sass/styles.scss"
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import CodeEditor from './components/CodeEditor'
import Preview from './components/Preview'
import bundler from '../bundler/index'

const App = () => {
  const ref = useRef<any>()
  const iframe = useRef<any>()
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const onClick = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const bundle = await bundler(input)
    setCode(bundle)
  }

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
