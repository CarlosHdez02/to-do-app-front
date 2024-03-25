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
function App() {
 

  return (
    <>
    
     <Routes>
      <Route path="/" element={<Layout/>}>
      {/*  Routes*/}
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>}/>
      <Route path="linkpage" element={<LinkPage/>}/>
    
    {/* Protected Route*/}
    <Route element={<PersistentLogin/>}>

    <Route element={<RequireAuth/>}>
       <Route path="tasks" element={<Tasks/>}/>
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
