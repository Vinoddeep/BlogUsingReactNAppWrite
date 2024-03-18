import React,{ useId } from "react";

const Input= React.forwardRef(
    function Input({label,type="text",className="",...props},ref)
    {
        const id=useId();
        return (
            <div style={{'width':'100vh'}}>
                {label && <label htmlFor={id} >{label}</label>}
                <input type={type} className={`px-3 ${className}`} ref={ref} {...props} id={id}  />
            </div>
        )
    }
)

export default Input;

