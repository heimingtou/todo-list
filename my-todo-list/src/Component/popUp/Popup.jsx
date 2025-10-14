
import { useState } from "react";
import Input from "../Input/Input";
import Title from "../Title/Title";
import "./Popup.css"
export default function Popup({onAdd,onClose}){
    const [list,setList]=useState([""])
    const[title,setTitle]=useState("")
    // them input list
    function add(){
        
        setList([...list,""])
    }
    // xoa input list
   function del(index){
        setList(list.filter((_,i)=>i!==index))
   }
   // cap nhat lai mang list 
   function handleChange(e, index){
        let newList=[...list];
        newList[index]=e.target.value;
        setList(newList)
   }
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
    <button className="btn" onClick={() => del(i)}>-</button>
    <Input placeholder={`List ${i + 1}`} className="list" value={list[i]} onChange={(e)=>handleChange(e,i)} />
  </div>
));
    return(
        <div className="Popup">
            <Input placeholder="Title" className="titles" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <button className="btn" onClick={add} >+</button>
            {renderList}
            <button className="btn-save" onClick={handleAddTask}>Save</button>
        </div>
    )
}