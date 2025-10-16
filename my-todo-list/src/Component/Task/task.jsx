
import { useState } from "react"
import CheckBox from "../checkBox/CheckBox"
import Title from "../Title/Title"
import "./task.css"
import Popup from "../popUp/Popup"
export default function Task({task,handleAdd,checkList}){
    const [showPopup,setShowPopup]=useState(false)
    // let listTask= task.list.map(list=>
    //     <CheckBox key={list}>{list.data}</CheckBox>
    // )
    let listTask=[]
    for(let i=0;i<task.list.length;i++)
    {
        
        listTask.push(<CheckBox checked={task.list[i].check}  onChange={()=>checkList(task,task.list[i].data)}  >{task.list[i].data}</CheckBox>)
    }
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