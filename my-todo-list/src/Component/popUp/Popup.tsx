
import { useEffect, useReducer, useState} from "react";
import Input from "../Input/Input";
import "./Popup.css"
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
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
type Action=
  | { type: "add" }
  | { type: "change"; id: number, value:string }
  | { type: "delete"; id: number }
  | { type: "changeTitle"; value: string }
  | { type:"changeDeadline";value:Date|null};

type PopupProps={
    onAdd: (value:TaskList)=>void,
    onClose:()=>void,
    taskList:TaskList
}
export default function Popup({onAdd,onClose,taskList}:PopupProps){
     const [value, setValue] = useState<Value>(new Date());
     const [show,setShow]=useState(false)
   function reducer(listT:TaskList,action:Action){
        switch (action.type){
            case 'add':
                return {...listT,list:[...listT.list,{data:"",check:false}]};
            case 'delete':
                return {...listT,list:listT.list.filter((_,i)=>i!==action.id)}
            case 'change':
                return {...listT,list:listT.list.map((item,i)=>i==action.id?{...item,data:action.value}:item)}
            case 'changeTitle':
                return { ...listT, title: action.value }
            case 'changeDeadline':
                return{...listT, deadline:action.value}

        }
   }
   const [listT,dispatch]=useReducer(reducer,taskList)
   // cap nhat lai mang list 
//    function handleChange(e, index){
//         let newList=[...list];
//         newList[index]=e.target.value;
//         setList(newList)
//    }
   function handleAddTask(){
    if(listT.title===""){
        onClose()
        return
    }
    const data={
        id:listT.id,
        title:listT.title,
        deadline: listT.deadline,
       list: listT.list.filter((item) => item.data.trim() !== "") // loai bo cac o rong 
    }
    onAdd(data) // goi callback truyen du lieu cho component cha
    onClose()// goi callback dong popup

   }
   let renderList = listT.list.map((item, i) => (
  <div key={i} className="InList" >
    <button className="btn" onClick={() => dispatch({type:'delete',id:i})}>-</button>
    <Input placeholder={`List ${i + 1}`} className="list" value={item.data} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>dispatch({type:'change',id: i,value:e.target.value})} />
  </div>
));

    //tinh toan deadline
     
    return(
        <div className="Popup">
            <Input placeholder="Title" className="titles" value={listT.title} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>dispatch({type:'changeTitle',value:e.target.value})} />
            <button className="btn" onClick={()=>dispatch({type:'add'})} >+</button>
            {renderList}
            <p>{listT.deadline?listT.deadline.toLocaleString():"khong co deadline"}</p>
            <div className="contain-Calendar">
              <button onClick={()=>setShow(!show) }>lich</button>
            {
                show&&
                <div style={{ maxWidth: '300px', margin: 'auto', textAlign: 'center' }} className="calendar">
                  <Calendar onChange={(v) => {
                                          setValue(v);
                                          if(v instanceof Date)
                                          dispatch({ type: 'changeDeadline', value: v });
                                        }}
                          value={value}
                          selectRange={false} // cho phép chọn khoảng ngày
                          locale="vi" // tiếng Việt
                          tileDisabled={({ date }) => date < new Date()} // disable ngày trước hôm nay
                          tileClassName={({ date }) =>
                          date.getDay() === 0 ? 'sunday' : undefined // highlight Chủ nhật
                  }/>
                  <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                    {Array.isArray(value)? `Bạn chọn từ ${value[0]?.toLocaleDateString()} đến ${value[1]?.toLocaleDateString()}`: `Bạn chọn: ${value?.toLocaleDateString()}`}
                  </div>     
                </div> }
            </div>
             <button className="btn-save" onClick={handleAddTask}>Save</button>
        </div>
    )
}