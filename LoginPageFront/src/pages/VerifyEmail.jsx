import authentify from "../assets/Logo.png"
import { Link } from "react-router-dom"

const VerifyEmail=()=>
{
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
                className="form-control text-center otp-input fs-6" />

            ))}
            </div>
            <button className="btn btn-primary w-100">
                Verify Email
            </button>


        </div>
        

       </div>  
       
    )
}
export default VerifyEmail