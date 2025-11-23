
import { useEffect, useState } from "react"
import CheckBox from "../checkBox/CheckBox"
import Title from "../Title/Title"
import "./task.css"
import Popup from "../popUp/Popup"
type subtask={
    data:string;
    check: boolean;
}
type TaskList={
        id:number,
        title:string,
        deadline:Date|null,
        list:subtask[]
        
}
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type taskType={
    task:TaskList,
    handleAdd: (value:TaskList)=>void,
    checkList: (task:TaskList,list:string)=>void,
    deleted: (value:number)=>void
}

export default function Task({task,handleAdd,checkList,deleted}:taskType){
    const [now, setNow] = useState(new Date());
    const [showPopup,setShowPopup]=useState(false)
    // let listTask= task.list.map(list=>
    //     <CheckBox key={list}>{list.data}</CheckBox>
    // )
    let listTask=[]
    for(let i=0;i<task.list.length;i++)
    {
        
        listTask.push(<div>
                        <CheckBox checked={task.list[i].check}  onChange={()=>checkList(task,task.list[i].data)}  >{task.list[i].data}</CheckBox>
                        <hr></hr>
        </div>
        
    )
    }
    useEffect(() => {
  const interval = setInterval(() => {
    setNow(new Date()); // cập nhật thời gian hiện tại mỗi phút
  }, 60 * 1000); // 60 * 1000 ms = 1 phút

  return () => clearInterval(interval); // cleanup khi component unmount
}, []);
    function calDeadline(value:ValuePiece){
      let displayText='';
      const today=new Date();
      const  calculateDaysDiff = (date: Date) => {
        const diffTime = date.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 60));}
    let day;
    if(value)
    {
        day=calculateDaysDiff(value)
        displayText=`deadline ban co ${day} phut`;
    }
      
    
    return displayText;
  } 
    return(
        <>
        <div className="contain-task">
        <div className="Popup-task">
             {showPopup&&
            <Popup key={task.id} onAdd={handleAdd} onClose={()=>setShowPopup(false) } taskList={task}  />
        }
        </div>
        
        <div className="task">
        <div className="title">
            <Title>{task.title}</Title>
        </div>
        <div className="content">
           {listTask}
        </div>
        <div>
            <p>{task.deadline?calDeadline(task.deadline):"khong co deadline"}</p>
        </div>
        <div className="btn-tool">
            <button className="btn-edit" onClick={()=>setShowPopup(true)}>Edit</button>
             <button className="btn-edit" onClick={()=>deleted(task.id)}>Delete</button>

        </div>
        </div>
        </div>
        </>
        
    )
}