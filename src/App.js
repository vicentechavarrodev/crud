
import { isEmpty } from 'lodash';
import React  ,{ useState } from 'react'
import shortid from 'shortid';



function App() {

  const [task,setTask] = useState("")
  const [tasks,setTasks] = useState([])
  const [editMode,setEditMode] = useState(false)
  const [id,setId] = useState("")
  const [error,setError] = useState("")
   

  const validForm  = () =>{
  let isValid = true;
  setError("")
    if(isEmpty(task)){
      setError("Debes ingresar una tarea")
      isValid= false;
    }
    return isValid;

  }
  

  const addTask = (e) => {
    e.preventDefault();
    if(!validForm()){
        return
      }

       const newTask = {
        id : shortid.generate(),
        name: task
       } 

      setTasks([...tasks,newTask])
      setTask("");
  }

 const deleteTask  = (id) =>{
    const filteredTasks = tasks.filter((task) =>  task.id !== id);
    setTasks(filteredTasks);
 }

 const editTask  = (task) =>{
  setEditMode(true)
  setTask(task.name);
  setId(task.id)
}



const saveTask = (e) => {
  e.preventDefault();
  if(!validForm()){
    return
  }

    const editedTasks =  tasks.map( item => (item.id ===  id ? { id , name: task} : item));
    setTasks(editedTasks);
    setTask("");
    setEditMode(false)
}

  return (
    <div className="App">
       <div className="container mt-5">

      
      <h1>Tareas</h1>
        <hr/>
       <div className='row'>
        <div className='col-8'>
        <h4 className='text-center'>Lista de Tareas</h4>
          <ul className='list-group'>
          {

           tasks.length == 0 ?
              <h5>No hay tareas</h5>
            : 

            tasks.map((task) =>
            <li className='list-group-item' key={task.id} >
              <span className='lead'>{task.name}</span>
              <button className='btn btn-danger btn-sm float-right mx-2' onClick={() => deleteTask(task.id)} >Delete</button>
              <button className='btn btn-warning btn-sm float-right' onClick={() => editTask(task)}>Edit</button>
            </li>
            )
          
          }
          </ul>

          </div> 

          <div className='col-4'>

          <h4 className='text-center'>Formulario</h4>
            <form  onSubmit={(editMode ?  saveTask : addTask )}>
              <input type='text'
               className='form-control mb-2'
               placeholder='Ingrese la tarea...'
               onChange={(text) => setTask(text.target.value) }
               value={task}
              ></input>
              {
                error && <span className='text-danger'>{error}</span>
              }
                <button type='submit' className={ editMode ? 'btn btn-warning btn-block': 'btn btn-dark btn-block'} >{editMode ? "Save": "Add" }</button>
            </form>
          </div>



       </div>
       </div>
    </div>
  );
}

export default App;
