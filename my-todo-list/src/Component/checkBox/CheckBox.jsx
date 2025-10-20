
export default function CheckBox({children,...props}){
    return(
         <label><input
         style={{
            marginRight:"15px"
         }}
         type="checkbox" {...props} />{children}</label> 
    )
}