import React, {FC, useState} from 'react'
import "../sass/styles.scss"

const App : FC = () => {
  const onClick = (e) => {
    e.preventDefault()
    console.log(input)
  }
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
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
