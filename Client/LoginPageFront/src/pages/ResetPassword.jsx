import { Link, useNavigate } from "react-router-dom"
import authentify from "../assets/Logo.png"
import { useContext, useRef, useState } from "react"
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
    const inputRef = useRef([]);
    const { isLoggedIn, getUserData, userData, backendURL } = useContext(AppContext);
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const [otp, setOtp] = useState("");

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/, "");
        e.target.value = value
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

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(backendURL + "/send-reset-otp?Email=" + email)
            if (response.status == 200) {
                toast.success("OTP Sent to your email");
                setIsEmailSent(true);
            } else {
                toast.error("Error Sending OTP");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        const otp = inputRef.current.map((input) => input.value).join("");
        if (otp.length < 6) {
            toast.error("Please enter 6 digit OTP");
            return;
        }
        setOtp(otp);
        setIsOtpSubmitted(true);
    }

    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(backendURL + "/reset-password", { email, otp, newPassword });
            if (response.status === 200) {
                toast.success("Password Reset Successfully");
                navigate("/login");
            } else {
                toast.error("Error Resetting Password, Please try again");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 position-relative"
             style={{
                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                 overflow: 'hidden'
             }}>

            {/* Decorative elements */}
            <div style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                top: '-150px',
                left: '-150px',
                filter: 'blur(40px)'
            }} />
            <div style={{
                position: 'absolute',
                width: '250px',
                height: '250px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%',
                bottom: '-100px',
                right: '-100px',
                filter: 'blur(40px)'
            }} />

            {/* Logo */}
            <Link to="/" className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2"
                  style={{
                      textDecoration: "none",
                      zIndex: 10,
                      transition: 'all 0.3s ease',
                      color: '#ffffff'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px',
                    borderRadius: '10px',
                    display: 'flex',
                    backdropFilter: 'blur(10px)'
                }}>
                    <img src={authentify} alt="logo" height={32} width={32} />
                </div>
                <span className="fw-bold" style={{ fontSize: '1.3rem' }}>Authentify</span>
            </Link>

            {/* Email Stage */}
            {!isEmailSent && (
                <div className="position-relative"
                     style={{
                         maxWidth: "420px",
                         width: "90%",
                         background: 'rgba(255, 255, 255, 0.95)',
                         backdropFilter: 'blur(10px)',
                         borderRadius: '20px',
                         padding: '45px 35px',
                         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                         animation: 'slideUp 0.6s ease'
                     }}>

                    <h3 className="mb-2 text-center fw-bold" style={{
                        fontSize: '1.8rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Reset Password
                    </h3>

                    <p className="text-center text-muted mb-5" style={{ fontSize: '0.95rem' }}>
                        Enter your registered email address to receive an OTP
                    </p>

                    <form onSubmit={onSubmitEmail}>
                        <div className="mb-4">
                            <label className="form-label fw-semibold" style={{ fontSize: '0.9rem', color: '#333' }}>
                                <i className="bi bi-envelope me-2" style={{ color: '#667eea' }}></i>
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                style={{
                                    borderRadius: '10px',
                                    border: '1px solid rgba(102, 126, 234, 0.3)',
                                    padding: '12px 15px',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#667eea';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <button
                            className="btn w-100 fw-semibold"
                            type="submit"
                            disabled={loading}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '12px',
                                fontSize: '0.95rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: loading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Sending OTP...
                                </>
                            ) : (
                                "Send OTP"
                            )}
                        </button>

                        <div className="text-center mt-4">
                            <Link to="/login" className="text-decoration-none" style={{
                                color: '#667eea',
                                fontWeight: '500',
                                transition: 'all 0.2s ease'
                            }}
                                  onMouseEnter={(e) => e.target.style.color = '#764ba2'}
                                  onMouseLeave={(e) => e.target.style.color = '#667eea'}
                            >
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            )}

            {/* OTP Stage */}
            {isEmailSent && !isOtpSubmitted && (
                <div className="position-relative"
                     style={{
                         maxWidth: "420px",
                         width: "90%",
                         background: 'rgba(255, 255, 255, 0.95)',
                         backdropFilter: 'blur(10px)',
                         borderRadius: '20px',
                         padding: '45px 35px',
                         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                         animation: 'slideUp 0.6s ease'
                     }}>

                    <h3 className="fw-bold mb-2 text-center" style={{
                        fontSize: '1.8rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Verify OTP
                    </h3>

                    <p className="fw-semibold mb-5 text-center text-muted" style={{ fontSize: '0.95rem' }}>
                        Enter the 6-digit code sent to your email
                    </p>

                    <form onSubmit={handleVerify}>
                        <div className="d-flex justify-content-between mb-5 gap-2">
                            {[...Array(6)].map((_, i) => (
                                <input
                                    type="text"
                                    key={i}
                                    maxLength={1}
                                    className="form-control text-center"
                                    ref={(el) => (inputRef.current[i] = el)}
                                    onChange={(e) => handleChange(e, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    onPaste={handlePaste}
                                    style={{
                                        borderRadius: '10px',
                                        border: '2px solid rgba(102, 126, 234, 0.3)',
                                        padding: '15px',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        transition: 'all 0.3s ease',
                                        letterSpacing: '5px'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#667eea';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            className="btn w-100 fw-semibold"
                            disabled={loading}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '12px',
                                fontSize: '0.95rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: loading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Verifying...
                                </>
                            ) : (
                                "Verify OTP"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-muted mt-4" style={{ fontSize: '0.85rem' }}>
                        Didn't receive the code? Check your spam folder or try again
                    </p>
                </div>
            )}

            {/* New Password Stage */}
            {isEmailSent && isOtpSubmitted && (
                <div className="position-relative"
                     style={{
                         maxWidth: "420px",
                         width: "90%",
                         background: 'rgba(255, 255, 255, 0.95)',
                         backdropFilter: 'blur(10px)',
                         borderRadius: '20px',
                         padding: '45px 35px',
                         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                         animation: 'slideUp 0.6s ease'
                     }}>

                    <h3 className="mb-2 text-center fw-bold" style={{
                        fontSize: '1.8rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Create New Password
                    </h3>

                    <p className="text-center text-muted mb-5" style={{ fontSize: '0.95rem' }}>
                        Enter a strong password to secure your account
                    </p>

                    <form onSubmit={onSubmitNewPassword}>
                        <div className="mb-4">
                            <label className="form-label fw-semibold" style={{ fontSize: '0.9rem', color: '#333' }}>
                                <i className="bi bi-lock me-2" style={{ color: '#667eea' }}></i>
                                New Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter new password"
                                style={{
                                    borderRadius: '10px',
                                    border: '1px solid rgba(102, 126, 234, 0.3)',
                                    padding: '12px 15px',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                required
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#667eea';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn w-100 fw-semibold"
                            disabled={loading}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '12px',
                                fontSize: '0.95rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: loading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Resetting...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <Link to="/login" className="text-decoration-none" style={{
                            color: '#667eea',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                              onMouseEnter={(e) => e.target.style.color = '#764ba2'}
                              onMouseLeave={(e) => e.target.style.color = '#667eea'}
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}

export default ResetPassword