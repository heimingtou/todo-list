
import { useReducer, useState } from "react";
import Input from "../Input/Input";
import "./Popup.css"
export default function Popup({onAdd,onClose}){
    const [list,dispatch]=useReducer(reducer,[""])
    const[title,setTitle]=useState("")
    // them input list
//     function add(){
        
//         setList([...list,""])
//     }
//     // xoa input list
//    function del(index){
//         setList(list.filter((_,i)=>i!==index))
//    }
   function reducer(list,action){
        switch (action.type){
            case 'add':
                return [...list,""];
            case 'delete':
                return list.filter((_,i)=>i!==action.id)
            case 'change':
                return list.map((item,i)=>i==action.id?action.value:item)

        }
   }
   // cap nhat lai mang list 
//    function handleChange(e, index){
//         let newList=[...list];
//         newList[index]=e.target.value;
//         setList(newList)
//    }
   function handleAddTask(){
    if(title===""){
        onClose()
        return
    }
    const data={
        title:title,
        list:list.filter((item)=>item.trim()!=="")// loai bo cac o rong 
    }
    onAdd(data) // goi callback truyen du lieu cho component cha
    onClose()// goi callback dong popup

   }
   let renderList = list.map((_, i) => (
  <div key={i} style={{ display: "flex" }}>
    <button className="btn" onClick={() => dispatch({type:'delete',id:i})}>-</button>
    <Input placeholder={`List ${i + 1}`} className="list" value={list[i]} onChange={(e)=>dispatch({type:'change',id: i,value:e.target.value})} />
  </div>
));
    return(
        <div className="Popup">
            <Input placeholder="Title" className="titles" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <button className="btn" onClick={()=>dispatch({type:'add'})} >+</button>
            {renderList}
            <button className="btn-save" onClick={handleAddTask}>Save</button>
        </div>
    )
}