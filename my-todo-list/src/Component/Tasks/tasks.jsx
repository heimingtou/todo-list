import { useState,useReducer } from "react";
import Popup from "../popUp/Popup";
import Task from "../Task/task";
import "./tasks.css"
export default function Tasks(){
    const [showPopup, setShowPopup] = useState(false); 
    const [nextTask,setNewTask]=useState()
    const listTask= [
    {
        id:Date.now()+1,
        title:"Hoc Web co ban",
        list:[
            "CSS","HTML","JS"
        ]
    },
    {
        id:Date.now()+2,
        title:"Hoc Web nang cao",
        list:[
            "JSX","TS"
        ]
    },
    {
        id:Date.now()+3,
        title:"HocGame",
        list:[
            "UNIT","C#"
        ]
    }
]

function reducer(taskList,action){
        switch (action.type){
            case 'add': {
                
                return [...taskList, action.value];
            }
            default:
                return taskList;
        }
   }
   const [taskList,dispatch]=useReducer(reducer,listTask)
function addTask(){
    const newTask = {
                    id: Date.now(),
                    title: "",
                    list: []
                };
    setNewTask(newTask)
    setShowPopup(true)
}
// const [task,setTask]=useState(taskList)
    function handleAdd(data){
      dispatch({type:'add',value:data})
    }
    let data = taskList.map((t) =>
        <Task key={t.id} task={t} handleAdd={handleAdd}/>
    );
    
    return(
        <>
        <button className="btn-add" onClick={addTask}>+</button>
        {showPopup&& <Popup onAdd={handleAdd} onClose={()=>setShowPopup(false)} taskList={nextTask}/>}
        
        <div className="list-task">
             {data}
        </div>
       
        </>
        
    )
}