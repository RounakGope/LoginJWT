import { useState } from 'react'
import './App.css'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import {ResetPassword} from './pages/ResetPassword'
import {VerifyEmail} from './pages/VerifyEmail'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/reset-password" component={ResetPassword}/>
      <Route path="/verify-email" component={VerifyEmail}/>

    </Routes>
    </>
  )
}

export default App
