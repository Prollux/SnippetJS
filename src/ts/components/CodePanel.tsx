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
      <Resizable direction='vertical'>
        <div className ='panel-wrapper'>
          <div className='editor-wrapper'>
            <CodeEditor value={input} onChange={(value:string)=> setInput(value)} />
          </div>
          <div className='preview-wrapper'>
            <Preview code={code} />
          </div>
      </div>
    </Resizable>
      <button id='code-submit' onClick={e => {onClick(e)}}>Submit</button>
  </div>

  )
}

export default CodePanel