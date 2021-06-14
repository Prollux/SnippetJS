import MonacoEditor from '@monaco-editor/react'
import React from 'react'

const CodeEditor = () => {
    return <MonacoEditor height='500px'
      width='750px'
      theme='vs-dark'
      language='javascript' options={{
          wordWrap:'on',
          showUnused: false,
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
      }}/>
}

export default CodeEditor
