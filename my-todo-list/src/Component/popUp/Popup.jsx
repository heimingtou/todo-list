
import { useReducer} from "react";
import Input from "../Input/Input";
import "./Popup.css"
export default function Popup({onAdd,onClose,taskList}){
    const [listT,dispatch]=useReducer(reducer,taskList)
    // them input list
//     function add(){
        
//         setList([...list,""])
//     }
//     // xoa input list
//    function del(index){
//         setList(list.filter((_,i)=>i!==index))
//    }
   function reducer(listT,action){
        switch (action.type){
            case 'add':
                return {...listT,list:[...listT.list,""]};
            case 'delete':
                return {...listT,list:listT.list.filter((_,i)=>i!==action.id)}
            case 'change':
                return {...listT,list:listT.list.map((item,i)=>i==action.id?action.value:item)}
            case 'changeTitle':
                return { ...listT, title: action.value }

        }
   }
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
       list: listT.list.filter((item) => item.trim() !== "") // loai bo cac o rong 
    }
    onAdd(data) // goi callback truyen du lieu cho component cha
    onClose()// goi callback dong popup

   }
   let renderList = listT.list.map((item, i) => (
  <div key={i} style={{ display: "flex" }}>
    <button className="btn" onClick={() => dispatch({type:'delete',id:i})}>-</button>
    <Input placeholder={`List ${i + 1}`} className="list" value={item} onChange={(e)=>dispatch({type:'change',id: i,value:e.target.value})} />
  </div>
));
    return(
        <div className="Popup">
            <Input placeholder="Title" className="titles" value={listT.title} onChange={(e)=>dispatch({type:'changeTitle',value:e.target.value})} />
            <button className="btn" onClick={()=>dispatch({type:'add'})} >+</button>
            {renderList}
            <button className="btn-save" onClick={handleAddTask}>Save</button>
        </div>
    )
}