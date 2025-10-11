import { useNavigate } from 'react-router-dom';
import logo_home from '../assets/logo_home.png';
import { useContext, useRef, useState,useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import profileImg from '../assets/profile.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import './Menubar.css';

const Menubar=()=>
{
    const {userData,backendURL,setIsLoggedIn,setUserData} = useContext(AppContext);
    const [dropdownOpen,setDropdownOpen]=useState(false);
    const dropdownRef=useRef(null);
    
    useEffect(() => {
      const handleClickOutside=(event)=>
      {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target))
        {
            setDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown",handleClickOutside)
    
      return () => {
        document.removeEventListener("mousedown",handleClickOutside)
      }
    }, [])
    const handleLogout =async()=>{
        try
        {
            axios.defaults.withCredentials=true;
           const response=await axios.post(backendURL+"/logout");
           if(response.status==200)
           {
            toast.success("Logged Out Successfully");
            setIsLoggedIn(false);
            setUserData(false);
            navigate("/");
           }

        }
        catch(e)
        {
            toast.error(e.message);

        }

    }
    
    
    const navigate=useNavigate();
    return (
        <nav className="navbar bg-white px-5 py-4 d-flex justify-content-between align-items-center" >
            <div className="d-flex align-items-center gap-2">
                <img src={logo_home} alt="logo" width={32}  height={32}/>
                <span className="fw-bold fs-3 text-dark">Authentify</span>
            </div>
            {
                  userData ? (
                    <div className="position-relative " ref={dropdownRef}>
                        <img src={profileImg} alt="no image"
                        style={{
                            width:"50px",
                            height:"50px",
                            cursor:"pointer",
                            userSelect:"none"
                        }}  onClick={()=>setDropdownOpen((prev)=>!prev)}/>

                        {
                            dropdownOpen && (
                                <div className="position-absolute shadow bg-white rounded p-2"
                                style={
                                    {
                                        top:"50px",
                                        right:"0px",
                                        zIndex:100
                                    }
                                }>
                                {
                                !userData.isAccountVerified && (
                                <div className="dropdown-item py-1 px-2" style={{cursor:"pointer"

                                    }}  >
                                        Verify-Email
                                </div>
                                )
                              }
                                <div className="dropdown-item py-1 px-2 text-danger" style={{
                                    cursor:"pointer" 
                                }} onClick={handleLogout} >
                                    Logout
                                </div>

                            </div>
                                

                        
                            )
                        }

                    </div>
             
               ) : (
    <div className="btn btn-outline-dark rounded-pill px-3" onClick={()=>navigate("/login")}>
      Login <i className="bi bi-arrow-right ms-2"></i>
    </div>
  )
}

        </nav>

    )

}
export default Menubar