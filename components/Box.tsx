interface BoxProps{
    children: React.ReactNode;
    classname?:string;
}

import React, { Children } from "react"
import { twMerge } from "tailwind-merge";

const Box: React.FC<BoxProps> = ({children , classname})=>{
    return(
        <div className={twMerge("bg-neutral-900 rounded-lg h-fit w-full", classname)}>
            {children}
        </div>
    )
}

export default Box;