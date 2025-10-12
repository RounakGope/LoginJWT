import { Link, useNavigate } from "react-router-dom"
import authentify from "../assets/Logo.png"
import { useContext, useRef, useState } from "react"
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
const ResetPassword =()=>
{
    const inputRef=useRef([]);
    const {isLoggedIn,getUserData,userData,backendURL}=useContext(AppContext);
    const navigate=useNavigate();
    const [newPassword,setNewPassword]=useState("");
    const [email,setEmail]=useState("");
    const [loading,setLoading]=useState(false);
    const [isEmailSent,setIsEmailSent]=useState(false);

    const[isOtpSubmitted,setIsOtpSubmitted]=useState(false);
    const[otp,setOtp]=useState("");
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
    const onSubmitEmail=async(e)=>
    {
        e.preventDefault();
        setLoading(true);
        try {
            
            const response = await axios.post(backendURL+"/send-reset-otp?Email="+email)
            if(response.status==200)
            {
                toast.success("OTP Sent to your email");
                setIsEmailSent(true);


            }
            else{
                toast.error("Error Sending OTP");
            }
            
        } catch (error) {
            toast.error(e.message);
            
        }
        finally{
            setLoading(false);
        }
    }
    const handleVerify=async(e)=>
    {
        e.preventDefault();
       
        const otp=inputRef.current.map((input)=>input.value).join("");
        if(otp.length<6)
        {
            toast.error("please enter 6 digit otp");
            return;
        }
        
        setOtp(otp);
        setIsOtpSubmitted(true);

    }
    const onSubmitNewPassword=async(e)=>
    {
        e.preventDefault();
        setLoading(true);
        try{
            const response =await axios.post(backendURL+"/reset-password",{email,otp,newPassword});
            if(response.status===200)
            {
                toast.success("Password Reset Successfully");

                navigate("/login");
            }
            else{
                toast.error("Error Resetting Password,Please try again");
            }
        }catch(error)
        {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }

    }
    
    

    return(
        <div className="d-flex justify-content-center password-reset-container align-items-center vh-100 position-relative"
        style={{background: "linear-gradient(180deg, #17a4e0ff, #510773ff)",border:"none"}}>
            <Link to="/"  className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2"
        style={{
            textDecoration:"none"
        }}>
        
        <img src={authentify} alt=""  height={32} width={32}/>
        <span className="fs-2 fw-bold text-dark">Authentify</span></Link>
        
        {
            !isEmailSent&&(
                <div className="rounded-4 p-4 bg-white text-center"
                style={{width:'100%',maxWidth:"400px"}}>
                    <h4 className="mb-2">Reset Password</h4>
                    <p className="mb-4">Enter Your Registered Email address</p>
                    <form onSubmit={onSubmitEmail}>
                        <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
                            <span className="ps-4 bg-transparent input-group-text border-0">
                                <i className="bi bi-envelope">

                                </i>

                            </span>
                            <input type="email" className="form-control bg-transparent border-0 ps-1 pe-4 rounded-end"
                            placeholder="Enter Email" 
                            style={{height:'50px'}}
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
                            required
                            />
                        


                        </div>
                        <button className="btn btn-primary w-100 py-2 " type="submit" disabled={loading}>
                            {loading?"Submitting Email...":"Submit Email"}
                        </button>
                    </form>



                </div>

            )}
            {
                isEmailSent && !isOtpSubmitted &&(
                     <div className="p-5 rounded-5 shadow bg-dark" style={{width:"400px"}}>
            <h4 className="fw-bold mb-2 text-white-50 text-center">Reset Password</h4>
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
              )}
              {
                isEmailSent && isOtpSubmitted &&(
                    <div className="rounded-4 p-4 text-center bg-white"
                    style={{width:"100%",maxWidth:"400px"}}>
                        <h4 className="mb-2">Set New Password</h4>
                        <p className="mb-4">Enter New Password Below</p>
                        <form onSubmit={onSubmitNewPassword}>
                            <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
                                <span className="input-group-text bg-transparent border-0 ps-4">
                                    <i className="bi bi-lock"></i>
                                </span>
                                
                            <input type="text" className="form-control bg-transparent ps-1 pe-4 rounded-end"
                            placeholder="******" 
                            style={{height:"50px"}}
                            onChange={(e)=>setNewPassword(e.target.value)}
                            value={newPassword}
                            required/>
                            
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading?"Reseting Password...":"Reset Password"}
                            </button>

                        </form>


                    </div>
                )
              }


        </div>
    )
}
export default ResetPassword