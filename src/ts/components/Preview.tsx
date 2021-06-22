import React, {FC, useRef, useEffect} from 'react'
interface PreviewProps {
    code:string;
    err:string;
}

const html = `
<html style="background-color: black; color:#39FF14">
  <head />
    <body>
      <script>
        const handleError = (err) => {
          document.querySelector('body').innerHTML = '<div id="cb-error" style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
        }

        window.addEventListener('message', async (event) => {

          try {
            await eval(event.data)
          }
          catch (err) {
            handleError(err)
          }
          
        }, false)
      </script>
    </body
  </html>
`

const Preview:FC<PreviewProps> = ({ code, err }) => {
    const iframe = useRef<any>()
    useEffect (() => {
        iframe.current.srcdoc = html
        setTimeout(() => {
          iframe.current.contentWindow.postMessage(code, '*')
    }, 50)
  }, [code, err])
    return (
      <>
        <iframe id='preview' title='code preview' ref={iframe} sandbox='allow-scripts' srcDoc={html}/>
        {err &&  <div className='preview-error'>{err}</div>}
      </>
    )
}

export default Preview
