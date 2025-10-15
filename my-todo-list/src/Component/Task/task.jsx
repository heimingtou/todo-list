
import { useState } from "react"
import CheckBox from "../checkBox/CheckBox"
import Title from "../Title/Title"
import "./task.css"
import Popup from "../popUp/Popup"
export default function Task({task,handleAdd}){
    const [showPopup,setShowPopup]=useState(false)
    let listTask= task.list.map(list=>
        <CheckBox key={list}>{list}</CheckBox>
    )
    return(
        <div className="task">
        {showPopup&&
            <Popup key={task.id} onAdd={handleAdd} onClose={()=>setShowPopup(false) } taskList={task}  />
        }
        <div className="title">
            <Title>{task.title}</Title>
        </div>
        <div className="content">
           {listTask}
        </div>
        <button onClick={()=>setShowPopup(true)}>edit</button>
        {/* <div className="tag">
            <span></span>
             <span></span>
              <span></span>
        </div> */}
        </div>
    )
}