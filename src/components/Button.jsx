import React from "react";

export default function Button({children,type='button',bgColor='blue',textColor='white',className='',...props}){

    return(
        <button className={className} 
        style={{'color':{textColor},'backgroundColor':{bgColor}}} {...props}>
        {children}
        </button>
    )

}