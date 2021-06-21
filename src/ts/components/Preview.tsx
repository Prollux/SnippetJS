import React, {FC, useRef, useEffect} from 'react'
interface PreviewProps {
    code:string;
}

const html = `
<html style="background-color: black; color:#39FF14">
  <head />
    <body>
      <script>
        window.addEventListener('message', async (event) => {

          try {
            await eval(event.data)
          }
          catch (err) {
            document.querySelector('body').innerHTML = '<div id="cb-error" style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
          }
          
        }, false)
      </script>
    </body
  </html>
`

const Preview:FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>()

    useEffect (() => {
        iframe.current.srcDoc = html
        iframe.current.contentWindow.postMessage(code, '*')
    }, [code])
    return (
        <iframe id='preview' title='code preview' ref={iframe} sandbox='allow-scripts' srcDoc={html}/>
    )
}

export default Preview
