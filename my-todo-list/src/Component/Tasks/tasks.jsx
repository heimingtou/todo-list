import { useState } from "react";
import Popup from "../popUp/Popup";
import Task from "../Task/task";
import "./tasks.css"
export default function Tasks(){
    const [showPopup, setShowPopup] = useState(false); 
    // const [listT,dispatch]=useReducer(reducer,listTask)
    const listTask= [
    {
        id:1,
        title:"Hoc Web co ban",
        list:[
            "CSS","HTML","JS"
        ]
    },
    {
        id:2,
        title:"Hoc Web nang cao",
        list:[
            "JSX","TS"
        ]
    },
    {
        id:3,
        title:"HocGame",
        list:[
            "UNIT","C#"
        ]
    }
]
// function addTask(){
//     dispatch({type:'add'})
//     setShowPopup(true)
// }
 const [task,setTask]=useState(listTask)
    function handleAdd(data){
       setTask((prev) => [...prev, data]);
    }
    let data=task.map((t)=>
    (
        <Task key={t.id} task={t} handleAdd={handleAdd}/>
    )
    )
    return(
        <>
        <button className="btn-add" onClick={()=>setShowPopup(true)}>+</button>
        {showPopup&& <Popup onAdd={handleAdd} onClose={()=>setShowPopup(false)} />}
        
        <div className="list-task">
             {data}
        </div>
       
        </>
        
    )
}