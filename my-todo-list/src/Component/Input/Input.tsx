import { InputHTMLAttributes } from "react"

export default function Input({placeholder,className,...props}:InputHTMLAttributes<HTMLInputElement>){
    return(
        <input type="text" 
        placeholder={placeholder}
        className={className}
        {...props}
        />
    )
}