import React, {FC, useState, useEffect, useRef} from 'react'
import CodeEditor from './CodeEditor'
import Preview from './Preview'
import bundler from '../../bundler/index'
import Resizable from './Resizable'

const CodePanel = () => {
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
      <div className='code-panel'>
        <Resizable direction='s'>
        <div id='preview-container'>
          <CodeEditor value={input} onChange={(value:string)=> setInput(value)} />
          <Preview code={code} />
        </div>
      </Resizable>
      <button id='code-submit' onClick={e => {onClick(e)}}>Submit</button>
  </div>

  )
}

export default CodePanel