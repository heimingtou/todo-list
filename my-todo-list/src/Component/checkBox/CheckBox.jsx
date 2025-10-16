
export default function CheckBox({children,...props}){
    return(
         <label><input type="checkbox" {...props} />{children}</label> 
    )
}