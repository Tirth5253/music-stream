interface BoxProps{
    children: React.ReactNode;
    className?:string;
    
}

import React, { Children } from "react"
import { twMerge } from "tailwind-merge";

const Box: React.FC<BoxProps> = ({children , className})=>{
    return(
        <div className={twMerge("bg-neutral-900 rounded-lg h-fit w-full", className)}>
            {children}
        </div>
    )
}

export default Box;