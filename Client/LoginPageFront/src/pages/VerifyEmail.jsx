import { useContext, useState,useRef, useEffect } from "react"
import authentify from "../assets/Logo.png"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const VerifyEmail=()=>
{
    const[loading,setLoading]=useState(false);
    const{getUserData,isLoggedIn,userData,backendURL}=useContext(AppContext);
    const navigate=useNavigate();
    const inputRef=useRef([]);
    const handleChange=(e,index)=>{
        const value=e.target.value.replace(/\D/,"");
        e.target.value=value
        if(value && index<5)
        {
            inputRef.current[index+1].focus();
        }

    }
    const handleKeyDown=(e,index)=>
    {
        if(e.key==="Backspace"&& !e.target.value && index>0)
        {
            inputRef.current[index-1].focus();
        }
    }
    const handlePaste=(e)=>{
        e.preventDefault();
        const paste=e.clipboardData.getData("text").slice(0,6).split("");
        paste.forEach((digit,i) => {
            if(inputRef.current[i])
            {
                inputRef.current[i].value=digit;
            }
            
        });
        const next=paste.length<6?paste.length:5;
        inputRef.current[next].focus();
    }
    
    
    const handleVerify=async(e)=>
    {
        e.preventDefault();
        const otp=inputRef.current.map((input)=>input.value).join("");
        if(otp.length<6)
        {
            toast.error("please enter 6 digit otp");
        }
        setLoading(true);
        try {
            axios.defaults.withCredentials=true;
            const response=await axios.post(backendURL+"/verify-otp",{otp})
            if(response.status===200)
            {
                toast.success("Email Verified Successfully");
                getUserData();
                navigate("/")
            }
            else{
                toast.error("Invalid OTP,Please Try Again");
            }
        } catch (error) {
    console.error(error);
    toast.error("Something went wrong,Please try again");
}
    }
    useEffect(() => {
      isLoggedIn && userData && userData.isAccountVerified && navigate("/");
    }, [isLoggedIn,userData])
    return(
       <div className="d-flex justify-content-center email-verify-container align-items-center vh-100 position-relative"
       style={{
        background: "linear-gradient(180deg, #17a4e0ff, #510773ff)",border:"none"
       }}>
        <Link to="/"  className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2"
        style={{
            textDecoration:"none"
        }}>
        
        <img src={authentify} alt=""  height={32} width={32}/>
        <span className="fs-2 fw-bold text-dark">Authentify</span></Link>
        <div className="p-5 rounded-5 shadow bg-dark" style={{width:"400px"}}>
            <h4 className="fw-bold mb-2 text-white-50 text-center">Verify Your Email</h4>
            <p className="fw-semibold mb-4 text-white-50 text-center">Enter Your 6 Digit OTP</p>


            <div className="d-flex justify-content-between mb-4 gap-2 text-center text-white-50 mb-2">
            {[...Array(6)].map((_,i)=>(
                <input type="text"
                key={i}
                maxLength={1}
                className="form-control text-center otp-input fs-6" 
                ref={(el)=>(inputRef.current[i]=el)}
                onChange={(e)=>handleChange(e,i)}
                onKeyDown={(e)=>handleKeyDown(e,i)}
                onPaste={handlePaste}
                />

            ))}
            </div>
            <button className="btn btn-primary w-100" disabled={loading} onClick={handleVerify}>

               {loading?"Verifying..":"Verify OTP"}
            </button>


        </div>
        

       </div>  
       
    )
}
export default VerifyEmail