import MonacoEditor from '@monaco-editor/react'
import React from 'react'

const CodeEditor = () => {
    return <MonacoEditor height='500px'
      width='750px'
      theme='vs-dark'
      language='javascript' options={{
          wordWrap:'on'
      }}/>
}

export default CodeEditor
