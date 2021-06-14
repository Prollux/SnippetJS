import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
import React from 'react'

interface EditorProps {
    value: string;
    onChange(value:string):void;
}

const CodeEditor:React.FC<EditorProps> = ({ value, onChange }) => {
    const onMount:EditorDidMount = (getVal, MonacoEditor) => {
        MonacoEditor.onDidChangeModelContent(()=> {
            onChange(getVal())
        })
        MonacoEditor.getModel()?.updateOptions({
            tabSize: 2,
        })
        //cannot set this option in comfiguration, must use this method to update underlying model
    }
    return <MonacoEditor 
      value={value}
      editorDidMount={onMount}
      height='100%'
      width='60%'
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
