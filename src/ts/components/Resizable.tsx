import { ResizableBox, ResizableBoxProps } from "react-resizable";
import React, { useState, FC } from 'react'

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}

const Resizable:FC<ResizableProps> = ({direction, children }) => {
    let boxProps: ResizableBoxProps

    if (direction === 'horizontal') {
        boxProps =  {
            maxConstraints: [window.innerWidth * 0.2, Infinity],
            minConstraints: [window.innerWidth * 0.75, Infinity],
            width: window.innerWidth * 0.75,
            height: Infinity,
            resizeHandles: ['e']
          }
    } else {
        boxProps = {
          maxConstraints: [Infinity, window.innerHeight * 0.9],
          minConstraints: [Infinity, window.innerHeight * 0.05],
          width: Infinity,
          height: 500,
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
