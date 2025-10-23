import { useState,useReducer,useEffect } from "react";
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
            {data:"CSS",check:false},
            {data:"HTML", check:false},
            {data:"JS",check:false}
        ]
    },
    {
        id:Date.now()+2,
        title:"Hoc Web nang cao",
        list:[
           {data:"JSX", check:false},
           {data:"TS",check:false}
        ]
    },
    {
        id:Date.now()+3,
        title:"Hoc Game",
        list:[
            {data:"UNIT",check:false},
            {data:"C#",check:false}
        ]
    }
]

function reducer(taskList,action){
        switch (action.type){
            case 'add': {
                
                return [...taskList, action.value];
            }
            case 'update':
                return taskList.map(t=>t.id==action.value.id?action.value:t)
            case 'delList':
                return taskList.map((item)=>{
                    if(item.id==action.taskId)
                    return {
                        ...item,
                        list: item.list.filter(item => item.data !== action.value)
                    }
                    return item
                    })
            case 'delete':
                return taskList.filter(t=>t.id!=action.id)
            default:
                return taskList;
        }
   }
//    const [taskList,dispatch]=useReducer(reducer,listTask)
 // 🔹 Khởi tạo từ localStorage
  const [taskList, dispatch] = useReducer(reducer, [], () => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : listTask;
  });

  // 🔹 Lưu lại mỗi khi taskList thay đổi
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

function addTask(){
    const newTask = {
                    id: Date.now(),
                    title: "",
                    list: [{data:"",check:false}]
                };
    setNewTask(newTask)
    setShowPopup(true)
}
// const [task,setTask]=useState(taskList)
   function handleAdd(data) {
  const exist = taskList.some(t => t.id === data.id);
  if (exist) {
    dispatch({ type: 'update', value: data });
  } else {
    dispatch({ type: 'add', value: data });
  }
}
function handleDelete(taskId){
    dispatch({type:'delete',id:taskId});
}
function handleCheck(data,listData){
    const newData=data;
    for(let i=0;i<newData.list.length;i++)
    {
        if(newData.list[i].data==listData)
        {
            newData.list[i].check=!newData.list[i].check;
        }
    }
    dispatch({type:'delList', value:listData,taskId:newData.id})
    
}
    let data = taskList.map((t) =>
        <Task key={t.id} task={t} handleAdd={handleAdd} checkList={handleCheck} deleted={handleDelete}/>
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