import { use, useContext, useState } from 'react'
import logo from '../assets/logo_home.png'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Login =()=>{
    const [isCreateAccount , setIsCreateAccount]=useState(false);
    const [name ,setName]=useState("");
    const [password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const[loading,setLoading]=useState(false);
    const {backendURL}=useContext(AppContext);
    const navigate =useNavigate();


    const onSubmitHandler=async(e)=>
    {
        e.preventDefault();
        axios.defaults.withCredentials=true;
        setLoading(true);
        try {
            if(isCreateAccount){
          const response= await axios.post(`${backendURL}/register`, { email, name, password });

          if(response.status==201)
          {
            navigate("/");
            toast.success("Successfully Registered")

          }
          else
          {
            toast.error("Email Already present")
          }
        }
        else{
            //login api
        }
            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
        finally{
            setLoading(false);
        }

    }

    return(
        <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center "
        style={{background: "linear-gradient(90deg, #ee0979, #ff6a00)",border:"none"}}>

            <div style={{position:"absolute",top:"20px" ,left:"30px", display:"flex" , alignItems:"center" }}>
                <Link to="/" style={{
                    display:"flex",
                    gap:"15px",
                    alignItems:"center",
                    fontWeight:"bold",
                    fontSize:"24px",
                    textDecoration:"none"
                }}>
                    <img src={logo} alt="logo" height={32} width={32} />
                    <span className='fw-bolder fs-3 text-dark'> Authentify</span>
                </Link>

            </div>
            <div className="card p-4" style={{maxWidth:"400px" ,width:"100%"}}>
                
                <h2 className='text-center fw-bold mb-4'>
                   {(isCreateAccount)? "Create Account" : "Login"}
                    
                </h2>
                <form onSubmit={onSubmitHandler}>
                    {
                        isCreateAccount &&
                        (
                            <div className="mb-3">
                        <label htmlFor="name" className='form-label'>Name</label>
                        <input type="text" id='name' className='form-control' placeholder='Enter-Name' required
                        onChange={(e)=>setName(e.target.value)}
                        value={name} />
                        </div>
                        )
                    }
                    <div className="mb-3">
                        <label htmlFor="email" className='form-label'>Email Id</label>
                        <input type="text" id='email' className='form-control' placeholder='Enter-Email' required 
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}/>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="text" id='password' className='form-control' placeholder='*******' required 
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}/>
                    </div>

                </form>
                {
                    !isCreateAccount &&(
                        <div className="d-flex justify-content-center align-items-center mb-3">
                    <Link to="/reset-password" className='text-decoration-none'>forgot password?</Link>
                </div>
                    )
                }
              {
                    isCreateAccount &&(
                        <div className="d-flex justify-content-center align-items-center mb-0 gap-2">
                             <p style={{marginTop:"18px"}}>Already Have Account?</p>
                            <span  className="text-decoration-underline" style={{cursor:"pointer"}} 
                            onClick={()=>setIsCreateAccount(false)}>Login Here</span>
                        </div>
                        
                    )
                }
                <button type='submit' className='btn btn-primary w-100' disabled={loading} >
                    {
                    loading?"Loading...":isCreateAccount? "Register": "Login"
                    }</button>

                
                  {
                       !isCreateAccount &&(
                        <div className="d-flex justify-content-center align-items-center mb-0 gap-2">
                            <h6 style={{marginTop:"10px"}}>Dont Have an account?</h6>
                            <span  className="text-decoration-underline" style={{cursor:"pointer"}} 
                            onClick={()=>setIsCreateAccount(true)}>Sign Up Here</span>
                        </div>
                    )
                  }  
                    
                

            </div>

        </div>
    )
}
export default Login