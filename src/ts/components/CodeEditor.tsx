import MonacoEditor from '@monaco-editor/react'
import React from 'react'

interface EditorProps {
    value: string;
    onChange(value:string):void;
}

const CodeEditor:React.FC<EditorProps> = ({ value, onChange }) => {
    const onMount = (getVal:()=> string, MonacoEditor:any) => {
        MonacoEditor.onDidChangeModelContent(()=> {
            onChange(getVal())
        })
    }
    return <MonacoEditor 
      value={value}
      editorDidMount={onMount}
      height='500px'
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
