import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import {Routes, Route} from 'react-router-dom'
import LinkPage from './components/LinkPage'
import Tasks from './components/Tasks'
import Layout from './components/Layout'
import Missing from './components/Missing'
import RequireAuth from './components/RequiredAuth'
import PersistentLogin from './components/PersistentLogin'

import ProjectsSideBar from './components/todo-app/ProjectsSideBar'
import Input from './components/todo-app/Input'
import NoProjectSelected from './components/todo-app/NoProjectSelected'
import NewProject from './components/todo-app/NewProject'
import SelectedProject from './components/todo-app/SelectedProject'

import {useState} from 'react';
function App() {

 const [projectState, setProjectsState] = useState({
  selectedProjectId: undefined,
  projects:[],
  tasks:[],
 })

 function handleAddTask(text){

  setProjectsState(prevState=>{
    const taskId = Math.random();
    const newTask = {
     text:text,
     projectId:prevState.selectedProjectId,
     id: taskId,
    }
    return {
      ...prevState,
      tasks:[...prevState.tasks,newTask ]
    }
  })

 }

 function handleDeleteTask(id){

  setProjectsState((prevState)=>{
    return{
      ...prevState,
      tasks:prevState.tasks.filter((task)=>task.id !== id)
    }
  })

 }

 function handleSelectProject(id){
    setProjectsState((prevState)=>{
      return{
        ...prevState,
        selectedProjectId:id
      }
    })
 }
 const handleStartAddProject = ()=>{
  setProjectsState(prevState =>{
    return{
      ...prevState,
      selectedProjectId:null,

    };
  })
 }

 function handleAddProject(projectData){
  setProjectsState(prevState=>{
    const projectId = Math.random();
    const newProject = {
     ...projectData,
     id: projectId,
    }
    return {
      ...prevState,
      selectedProjectId:undefined,
      projects:[...prevState.projects,newProject ]
    }
  })
 }

 function handleCancelProject(){
  setProjectsState((prevState)=>{
    return{
      ...prevState,
      selectedProjectId:undefined,
    }
  })
 }

 function handleDeleteProject(){
  setProjectsState((prevState)=>{
    return{
      ...prevState,
      selectedProjectId:undefined,
      projects:prevState.projects.filter
      ((project)=>project.id !== prevState.selectedProjectId)
    }
  })
 }
 const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)

let content = <SelectedProject 
                  project={selectedProject} 
                  onDelete={handleDeleteProject} 
                  onAddTask={handleAddTask}
                  onDeleteTask={handleDeleteTask}
                  tasks={projectState.tasks}
                  /> ;
if(projectState.selectedProjectId ===null){

  content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject}/>
}else if(projectState.selectedProjectId === undefined){
  content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
}
  return (
    <>
    <main className="h-screen my-8 flex gap-8">
    <ProjectsSideBar onStartAddProject={handleStartAddProject}
      projects={projectState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectId={projectState.selectedProjectId}
    />
    {content}
    </main>
   
    
     <Routes>
      <Route path="/" element={<Layout/>}>
      {/*  Routes*/}
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>}/>
      <Route path="linkpage" element={<LinkPage/>}/>

      <Route path="input" element={<Input/>}/>
      <Route path="tasks" element={<ProjectsSideBar/>}/>
    
    
    {/* Protected Route*/}
    <Route element={<PersistentLogin/>}>



    <Route element={<RequireAuth/>}>
     
     
  
    </Route>

    </Route>
    

      {/* Error route */}
      <Route path="*" element={<Missing/>}/>

      </Route>
     </Routes>
    </>
  )
}

export default App
