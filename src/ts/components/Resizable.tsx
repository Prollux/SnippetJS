import { ResizableBox } from "react-resizable";
import React, { useState, FC } from 'react'

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}

const Resizable:FC<ResizableProps> = ({direction, children }) => {
    
    return (
        <ResizableBox maxConstraints={[Infinity, window.innerHeight * 0.9]}width={Infinity} height={500} resizeHandles={['s']}>
            {children}
        </ResizableBox>
    )

}

export default Resizable
