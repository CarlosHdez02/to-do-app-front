import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import {Routes, Route} from 'react-router-dom'
import LinkPage from './components/LinkPage'
import Tasks from './components/Tasks'
import Layout from './components/Layout'
import Missing from './components/Missing'
import RequireAuth from './components/RequiredAuth'
function App() {
 

  return (
    <>
    <h1>App page</h1>
     <Routes>
      <Route path="/" element={<Layout/>}>
      {/*  Routes*/}
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>}/>
      <Route path="linkpage" element={<LinkPage/>}/>
    
    {/* Protected Route*/}
    <Route element={<RequireAuth/>}>
       <Route path="tasks" element={<Tasks/>}/>
    </Route>

      {/* Error route */}
      <Route path="*" element={<Missing/>}/>

      </Route>
     </Routes>
    </>
  )
}

export default App