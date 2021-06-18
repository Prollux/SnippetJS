import { ResizableBox, ResizableBoxProps } from "react-resizable";
import React, { useEffect, useState, FC } from 'react'

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}

const Resizable:FC<ResizableProps> = ({direction, children }) => {
    let boxProps: ResizableBoxProps
    const [width, useWidth] = useState(window.innerWidth)
    const [height, useHeight] = useState(window.innerHeight)

    useEffect(() => {
      const windowListener = () => {
        useWidth(window.innerWidth)
        useHeight(window.innerHeight)
      }
        window.addEventListener('resize', windowListener)
          return () => {
            window.removeEventListener('resize', windowListener)
          }
    }, [])

    if (direction === 'horizontal') {
        boxProps =  {
            className: 'resizable-horizontal',
            maxConstraints: [height * 0.75, Infinity],
            minConstraints: [width * 0.2, Infinity],
            width: width * 0.75,
            height: Infinity,
            resizeHandles: ['e']
          }
    } else {
        boxProps = {
          className: 'resizable-vertical',
          maxConstraints: [Infinity, width * 0.9],
          minConstraints: [Infinity, height * 0.05],
          width: Infinity,
          height: height * 0.5,
          resizeHandles: ['s']
        }
    }

    return (
        <ResizableBox {...boxProps}>

          {children}

        </ResizableBox>
    )

}

export default Resizable
