
import CheckBox from "../checkBox/CheckBox"
import Title from "../Title/Title"
import "./task.css"
export default function Task({title,lists}){
    let listTask= lists.map(list=>
        <CheckBox key={list}>{list}</CheckBox>
    )
    return(
        <div className="task">
        
        <div className="title">
            <Title>{title}</Title>
        </div>
        <div className="content">
           {listTask}
        </div>
        {/* <div className="tag">
            <span></span>
             <span></span>
              <span></span>
        </div> */}
        </div>
    )
}