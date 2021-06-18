import { ResizableBox, ResizableBoxProps } from "react-resizable";
import React, { useState, FC } from 'react'

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}

const Resizable:FC<ResizableProps> = ({direction, children }) => {
    let boxProps: ResizableBoxProps

    if (direction === 'horizontal') {
        boxProps =  {
            className: 'resizable-horizontal',
            maxConstraints: [window.innerWidth * 0.75, Infinity],
            minConstraints: [window.innerWidth * 0.2, Infinity],
            width: window.innerWidth * 0.75,
            height: Infinity,
            resizeHandles: ['e']
          }
    } else {
        boxProps = {
          className: 'resizable-vertical',
          maxConstraints: [Infinity, window.innerHeight * 0.9],
          minConstraints: [Infinity, window.innerHeight * 0.05],
          width: Infinity,
          height: window.innerHeight * 0.5,
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
