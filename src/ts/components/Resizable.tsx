import { ResizableBox } from "react-resizable";
import React, { useState, FC } from 'react'

interface ResizableProps {
    direction: 'e' | 's';
}

const Resizable:FC<ResizableProps> = ({direction, children }) => {
    
    return (
        <ResizableBox 
          maxConstraints={[Infinity, window.innerHeight * 0.9]}
          minConstraints={[Infinity, window.innerHeight * 0.05]}
          width={Infinity} height={500}
          resizeHandles={[direction]}>

          {children}

        </ResizableBox>
    )

}

export default Resizable
