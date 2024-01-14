import {Route} from 'react-router-dom'
import './App.css'
import { useState, useEffect } from 'react'
import Header from './TaskTracker/Components/Header'
import Footer from './TaskTracker/Components/Footer'
import Tasks from './TaskTracker/Components/Tasks'
import AddTask from './TaskTracker/Components/AddTask'
import About from './TaskTracker/Components/About'


export default function App() {
    const [showAddTask, setShowAddTask] = useState(true)
    const [tasks, setTasks] = useState([])

    useEffect(() =>{
        const getTasks = async () =>{
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    },[])

    //fetch data from server
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks') 
        console.log(res);
        const data = await res.json()
        console.log(data);
        return data
    }
    //fetch task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`) 
        const data = await res.json()
        console.log(data);
        return data
    }

    //Add task
    const addTask = async (task) =>{
        const res = await fetch('http://localhost:5000/tasks',
        {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        }
        )
        const data = await res.json()
        setTasks([...tasks,data])

        // const id = Math.floor(Math.random()*10000 + 1)
        // const newTask = { id, ...task}
        // setTasks([...tasks, newTask])
    } 

    //Delete Task
    const deleteTask = async (id) =>{
        await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE'});
        setTasks(tasks.filter((task) => task.id !== id))
    }

    //toggle reminder
    const toggleReminder = async(id) =>{
        const taskToToggle = await fetchTask(id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`,
        {
            method: 'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        }
        );
        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ?{...task, reminder: data.reminder} : task))
    }
    return(
        <div className='container'>
            <Header onAdd ={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask} />
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ?<Tasks tasks = {tasks} onDelete ={deleteTask} onToggle={toggleReminder} /> : 'Add some'}
            {/* <Route path ='/about' element={<About/>}/> */}
            {/* <Footer/> */}
        </div>

    )
}