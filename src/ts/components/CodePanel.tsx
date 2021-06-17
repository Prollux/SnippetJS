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
    <Resizable direction={'horizontal'}>
      <div className='code-panel'>
        <div id='preview-container'>
          <CodeEditor value={input} onChange={(value:string)=> setInput(value)} />
          <Preview code={code} />
        </div>
      <button id='code-submit' onClick={e => {onClick(e)}}>Submit</button>
  </div>
</Resizable>
  )
}

export default CodePanel