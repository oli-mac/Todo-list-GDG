import { useState,useEffect } from "react";
import back from "./todo.jpg";
const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);//handel the popup for addtask button
  const [detailActive, setDetailActive] = useState(false);


  const [newTodo, setNewTodo] = useState("");
  const [newNote, setnewNote] = useState("");
  const [newCollaborator, setnewCollaborator] = useState("");
  const [newLabel, setnewLabel] = useState("");
  const [newDeadline, setnewDeadline] = useState("");

  
  


//  const [editingText, setEditingText] =useState("");


  useEffect(()=>{
    GetTodos();

    console.log(todos);
  },[todos]);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then( res => res.json())
      .then( data => setTodos(data))
      .catch(err => console.error("Error: 420",err));

  }
  const completeTodo = async id => {
    const data = await fetch(API_BASE + "/todo/complete/" + id).then(res => res.json());  

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      } 

      return todo;
    }));
  }
  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {method: "DELETE"}).then(res => res.json());  

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }





//const submitEdits = async id => {
//    const updatedTodos = await fetch(API_BASE + "/todo/update/" {
  //    if (todo._id === updatedTodos._id) {
    //    todo.text = editingText;
     // }
      //return todo;
    //});
    //setTodos([...todos,data]);
    //setPopupActive(false);
    //setNewTodo("");
  //}


 

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new/",{
      method: "POST",
      headers:{
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTodo,
        note: newNote,
        Collaborator: newCollaborator,
        label: newLabel,
        deadline: newDeadline
      })
    }).then(res => res.json());  
    
    setTodos([...todos,data]);
    setPopupActive(false);
    setNewTodo("");
   
  }


  return (
    <div className="App" style ={{backgroundImage:'url(${back})'}}>
      <h1>Welcome</h1>
      <h4>Your Tasks are...</h4>
      <div className="todos">
        {todos.map(todo => (
          <div className={"todo " + (todo.complete ? "is-complete" : "")} 
          key={todo._id} onClick={() => completeTodo(todo._id)}>
              <div className="contain">
                <div className="checkbox">

                </div>
                <div className="text">
                <h6>Todo</h6> <h3 className="titletxt">{todo.text}</h3>
                </div>
              </div>
              <div className="text">
                <h6>Note</h6><h3>{todo.note}</h3>
              </div>
              <div className="text">
                <h6>Collaborators</h6><h3>{todo.Collaborator}</h3>
              </div>
              <div className="text">
                <h6>Lable</h6><h3>{todo.label}</h3>
              </div>
              <div className="text">
                <h6>Priority</h6><h3>{todo.deadline}</h3>
              </div>
              {/* <div className="detailsbox" onClick={() => setDetailActive(true)}>
                  Details
              </div> */}
              {/* <div className="editbox">
                  Edit
              </div> */}
              <div className="delete-todo" onClick={() => deleteTodo(todo._id)} >
                x
              </div>
          </div>
        ))}
       
      </div>

        <div className="addPopup" onClick={() => setPopupActive(true)}>
          +
        </div> 
      { popupActive ? (
          <div className="popup">
            <div className="closePopup" onClick={() => setPopupActive(false)}>X</div> 
            <div className="content">
              <h3>Add Task</h3>
              <input type="text" placeholder="Title" className ="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo}/>        
              <input type="text" placeholder="Note" className ="add-todo-input" onChange={e => setnewNote(e.target.value)} value={newNote}/> 
              <input type="text" placeholder="Collaborators" className ="add-todo-input" onChange={e => setnewCollaborator(e.target.value)} value={newCollaborator}/>
              <input type="text" placeholder="Lable" className ="add-todo-input" onChange={e => setnewLabel(e.target.value)} value={newLabel}/>
              <input type="text" placeholder="Priority" className ="add-todo-input" onChange={e => setnewDeadline(e.target.value)} value={newDeadline}/>
                  {/* bind out new todo variable to the this this we write in the input fild */}
                  <div className="button" onClick={addTodo}>Create Task</div>
            </div>
          </div>
      ) : '' }


      { detailActive ? (
          <div className="popup">
            <div className="closePopup" onClick={() => setDetailActive(false)}>X</div> 
            <div className="content">
              
            </div>
          </div>
      ) : '' }
    </div> 
  );
}

export default App;




