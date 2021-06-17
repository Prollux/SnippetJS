import { ResizableBox } from "react-resizable";
import React, { useState, FC } from 'react'

interface ResizableProps {
    height: number;
    width: number;
}

const Resizable:FC<ResizableProps> = ({width, height, children }) => {
    
    return (
        <ResizableBox width={300} height={300}>
            {children}
        </ResizableBox>
    )

}

export default Resizable
