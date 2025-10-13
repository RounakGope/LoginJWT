import { useNavigate } from 'react-router-dom';
import logo_home from '../assets/logo_home.png';
import { useContext, useRef, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import profileImg from '../assets/profile.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import './Menubar.css';

const Menubar = () => {
    const { userData, backendURL, setIsLoggedIn, setUserData } = useContext(AppContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside)
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendURL + "/logout");
            if (response.status == 200) {
                toast.success("Logged Out Successfully");
                setIsLoggedIn(false);
                setUserData(false);
                navigate("/");
            }
        } catch (e) {
            toast.error(e.message);
        }
    }

    const sendVerifyOTP = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendURL + "/send-otp");
            if (response.status == 200) {
                toast.success("OTP has been Sent");
                navigate("/verify-email");
            } else {
                toast.error("Unable to sent OTP");
            }
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <nav className="navbar px-5 py-4 d-flex justify-content-between align-items-center shadow-sm"
             style={{
                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                 backdropFilter: 'blur(10px)',
                 borderBottom: 'none',
                 position: 'sticky',
                 top: 0,
                 zIndex: 999
             }}>
            
            {/* Logo Section */}
            <div className="d-flex align-items-center gap-3" style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}>
                    <img src={logo_home} alt="logo" width={32} height={32} />
                </div>
                <span className="fw-bold" style={{
                    fontSize: '1.5rem',
                    color: '#ffffff',
                    letterSpacing: '0.5px'
                }}>
                    Authentify
                </span>
            </div>

            {/* User Section */}
            {userData ? (
                <div className="position-relative" ref={dropdownRef}>
                    <div
                        style={{
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            userSelect: "none",
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            transition: 'all 0.3s ease',
                            boxShadow: dropdownOpen ? '0 8px 20px rgba(0, 0, 0, 0.2)' : 'none'
                        }}
                        onClick={() => setDropdownOpen((prev) => !prev)}
                    >
                        <img src={profileImg} alt="profile" style={{
                            width: "100%",
                            height: "100%",
                            objectFit: 'cover'
                        }} />
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="position-absolute" style={{
                            top: "65px",
                            right: "0px",
                            zIndex: 100,
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '12px',
                            border: '1px solid rgba(102, 126, 234, 0.15)',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                            padding: '8px',
                            minWidth: '200px',
                            animation: 'slideDown 0.3s ease'
                        }}>
                            {!userData.isAccountVerified && (
                                <div
                                    className="dropdown-item"
                                    style={{
                                        padding: '12px 16px',
                                        cursor: "pointer",
                                        borderRadius: '8px',
                                        transition: 'all 0.2s ease',
                                        fontSize: '0.95rem',
                                        color: '#667eea',
                                        fontWeight: '500',
                                        marginBottom: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                                        e.target.style.paddingLeft = '20px';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'transparent';
                                        e.target.style.paddingLeft = '16px';
                                    }}
                                    onClick={sendVerifyOTP}
                                >
                                    <i className="bi bi-envelope me-2" style={{ fontSize: '1rem' }}></i>
                                    Verify Email
                                </div>
                            )}

                            {userData.isAccountVerified && (
                                <div
                                    className="dropdown-item"
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        fontSize: '0.95rem',
                                        color: '#28a745',
                                        fontWeight: '500',
                                        marginBottom: '4px',
                                        cursor: 'default'
                                    }}
                                >
                                    <i className="bi bi-check-circle me-2" style={{ fontSize: '1rem' }}></i>
                                    Email Verified
                                </div>
                            )}

                            <div style={{ borderTop: '1px solid rgba(102, 126, 234, 0.1)', margin: '4px 0' }} />

                            <div
                                className="dropdown-item"
                                style={{
                                    padding: '12px 16px',
                                    cursor: "pointer",
                                    borderRadius: '8px',
                                    transition: 'all 0.2s ease',
                                    fontSize: '0.95rem',
                                    color: '#dc3545',
                                    fontWeight: '500'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(220, 53, 69, 0.1)';
                                    e.target.style.paddingLeft = '20px';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'transparent';
                                    e.target.style.paddingLeft = '16px';
                                }}
                                onClick={handleLogout}
                            >
                                <i className="bi bi-box-arrow-right me-2" style={{ fontSize: '1rem' }}></i>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    className="btn px-4 py-2 fw-semibold"
                    style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '25px',
                        fontSize: '0.95rem',
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                    onClick={() => navigate("/login")}
                >
                    Login <i className="bi bi-arrow-right ms-2"></i>
                </button>
            )}

            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </nav>
    )
}

export default Menubar