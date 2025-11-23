

 
 type TitleProps={
    children: string;
 }
 
 export default function Title({children}:TitleProps){
    return(
        <h1 style={
            {
                fontSize:"35px",
                marginTop:"2px",
                color:"black"
            }
        }>{children}</h1>
    )
 }