import { useState } from 'react'
import './App.css'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/VerifyEmail'
import { ToastContainer } from 'react-toastify'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
       <ToastContainer/>
        <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/reset-password" element={<ResetPassword/>}/>
         <Route path="/verify-email" element={<VerifyEmail/>}/>

    </Routes>
    </div>
    
   
    
  )
}

export default App
