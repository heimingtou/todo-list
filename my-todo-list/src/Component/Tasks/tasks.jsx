import { useState } from "react";
import Popup from "../popUp/Popup";
import Task from "../Task/task";
import "./tasks.css"
export default function Tasks(){
    const [task,setTask]=useState([])
    const [showPopup,setShowPopup]=useState(false)
    function handleAdd(data){
       setTask((prev) => [...prev, data]);
    }
    let data=task.map((t)=>
    (
        <Task key={t.title} title={t.title} lists={t.list}/>
    )
    )
    return(
        <>
        <button className="btn-add" onClick={()=>setShowPopup(true)}>+</button>
        {showPopup&&
            <Popup onAdd={handleAdd} onClose={()=>setShowPopup(false)} />
        }
        <div className="list-task">
             {data}
        </div>
       
        </>
        
    )
}