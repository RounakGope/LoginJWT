import { useContext, useState, useRef, useEffect } from "react"
import authentify from "../assets/logo_home.png"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const [loading, setLoading] = useState(false);
    const { getUserData, isLoggedIn, userData, backendURL } = useContext(AppContext);
    const navigate = useNavigate();
    const inputRef = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, "");
        e.target.value = value;
        if (value && index < 5) {
            inputRef.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRef.current[index - 1].focus();
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").slice(0, 6).split("");
        paste.forEach((digit, i) => {
            if (inputRef.current[i]) {
                inputRef.current[i].value = digit;
            }
        });
        const next = paste.length < 6 ? paste.length : 5;
        inputRef.current[next].focus();
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        const otp = inputRef.current.map((input) => input.value).join("");
        if (otp.length < 6) {
            toast.error("Please enter 6 digit OTP");
            return;
        }
        setLoading(true);
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendURL + "/verify-otp", { otp });
            if (response.status === 200) {
                toast.success("Email Verified Successfully");
                getUserData();
                navigate("/");
            } else {
                toast.error("Invalid OTP, Please Try Again");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong, Please try again");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        isLoggedIn && userData && userData.isAccountVerified && navigate("/");
    }, [isLoggedIn, userData]);

    return (
        <div 
            className="d-flex justify-content-center align-items-center vh-100 position-relative"
            style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
        >
            {/* Logo Header */}
            <Link 
                to="/" 
                className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2"
                style={{ textDecoration: "none" }}
            >
                <img src={authentify} alt="Authentify Logo" height={40} width={40} />
                <span className="fs-3 fw-bold text-white">Authentify</span>
            </Link>

            {/* Verify Card */}
            <div 
                className="p-5 rounded-4 shadow-lg bg-white"
                style={{ 
                    width: "450px",
                    maxWidth: "90%"
                }}
            >
                {/* Header */}
                <h2 className="fw-bold mb-2 text-center" style={{ color: "#667eea" }}>
                    Verify Your Email
                </h2>
                <p className="text-muted text-center mb-4">
                    Enter the 6-digit OTP sent to your email
                </p>

                {/* OTP Input Fields */}
                <form onSubmit={handleVerify}>
                    <div className="d-flex justify-content-center gap-2 mb-4">
                        {[...Array(6)].map((_, i) => (
                            <input
                                key={i}
                                type="text"
                                maxLength={1}
                                className="form-control text-center fw-bold fs-4"
                                style={{
                                    width: "55px",
                                    height: "55px",
                                    border: "2px solid #e0e0e0",
                                    borderRadius: "12px",
                                    fontSize: "1.5rem",
                                    transition: "all 0.3s ease"
                                }}
                                ref={(el) => (inputRef.current[i] = el)}
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                onPaste={handlePaste}
                                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                                onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <button
                        type="submit"
                        className="btn w-100 text-white fw-semibold py-3 rounded-3"
                        style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            border: "none",
                            fontSize: "1.1rem",
                            transition: "transform 0.2s ease"
                        }}
                        disabled={loading}
                        onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
                        onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                    >
                        {loading ? "Verifying..." : "Verify Email"}
                    </button>
                </form>

                
            </div>
        </div>
    )
}

export default VerifyEmail;
