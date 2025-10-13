import { useContext, useState } from 'react'
import logo from '../assets/logo_home.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);
        try {
            if (isCreateAccount) {
                const response = await axios.post(`${backendURL}/register`, { email, name, password });
                if (response.status == 201) {
                    navigate("/");
                    toast.success("Successfully Registered")
                } else {
                    toast.error("Email Already present")
                }
            } else {
                const response = await axios.post(`${backendURL}/login`, { email, password });
                if (response.status == 200) {
                    setIsLoggedIn(true);
                    getUserData();
                    navigate("/");
                    toast.success("Logged In Successfully");
                } else {
                    toast.error("Email Or Password Wrong");
                }
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
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
            <div style={{
                position: "absolute",
                top: "30px",
                left: "30px",
                display: "flex",
                alignItems: "center",
                zIndex: 10
            }}>
                <Link to="/" style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                    textDecoration: "none",
                    color: "#ffffff",
                    transition: 'all 0.3s ease'
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
                        <img src={logo} alt="logo" height={32} width={32} />
                    </div>
                    <span className='fw-bold'> Authentify</span>
                </Link>
            </div>

            {/* Card Container */}
            <div className="card position-relative"
                 style={{
                     maxWidth: "420px",
                     width: "90%",
                     border: 'none',
                     borderRadius: '20px',
                     boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                     background: 'rgba(255, 255, 255, 0.95)',
                     backdropFilter: 'blur(10px)',
                     padding: '40px 35px',
                     animation: 'slideUp 0.6s ease'
                 }}>

                <h2 className='text-center fw-bold mb-2' style={{
                    fontSize: '1.8rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    {isCreateAccount ? "Create Account" : "Welcome Back"}
                </h2>

                <p className='text-center text-muted mb-4' style={{ fontSize: '0.95rem' }}>
                    {isCreateAccount ? "Join us today" : "Sign in to continue"}
                </p>

                <form onSubmit={onSubmitHandler}>
                    {isCreateAccount && (
                        <div className="mb-3" style={{ animation: 'slideDown 0.3s ease' }}>
                            <label htmlFor="name" className='form-label fw-semibold' style={{ fontSize: '0.9rem', color: '#333' }}>
                                <i className="bi bi-person me-2" style={{ color: '#667eea' }}></i>
                                Full Name
                            </label>
                            <input
                                type="text"
                                id='name'
                                className='form-control'
                                placeholder='Enter your name'
                                required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                style={{
                                    borderRadius: '10px',
                                    border: '1px solid rgba(102, 126, 234, 0.3)',
                                    padding: '12px 15px',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.3s ease'
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
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="email" className='form-label fw-semibold' style={{ fontSize: '0.9rem', color: '#333' }}>
                            <i className="bi bi-envelope me-2" style={{ color: '#667eea' }}></i>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id='email'
                            className='form-control'
                            placeholder='Enter your email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            style={{
                                borderRadius: '10px',
                                border: '1px solid rgba(102, 126, 234, 0.3)',
                                padding: '12px 15px',
                                fontSize: '0.95rem',
                                transition: 'all 0.3s ease'
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
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className='form-label fw-semibold' style={{ fontSize: '0.9rem', color: '#333' }}>
                            <i className="bi bi-lock me-2" style={{ color: '#667eea' }}></i>
                            Password
                        </label>
                        <input
                            type="password"
                            id='password'
                            className='form-control'
                            placeholder='Enter your password'
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            style={{
                                borderRadius: '10px',
                                border: '1px solid rgba(102, 126, 234, 0.3)',
                                padding: '12px 15px',
                                fontSize: '0.95rem',
                                transition: 'all 0.3s ease'
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
                    </div>

                    {!isCreateAccount && (
                        <div className="d-flex justify-content-end mb-4">
                            <Link to="/reset-password" className='text-decoration-none' style={{
                                color: '#667eea',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                transition: 'all 0.2s ease'
                            }}
                                  onMouseEnter={(e) => e.target.style.color = '#764ba2'}
                                  onMouseLeave={(e) => e.target.style.color = '#667eea'}
                            >
                                Forgot password?
                            </Link>
                        </div>
                    )}

                    <button
                        type='submit'
                        className='btn w-100 fw-semibold'
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
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Loading...
                            </>
                        ) : (
                            isCreateAccount ? "Create Account" : "Sign In"
                        )}
                    </button>
                </form>

                {/* Toggle Account */}
                <div className="text-center mt-4" style={{
                    borderTop: '1px solid rgba(102, 126, 234, 0.1)',
                    paddingTop: '20px'
                }}>
                    {isCreateAccount ? (
                        <p className='text-muted mb-0' style={{ fontSize: '0.9rem' }}>
                            Already have an account?{' '}
                            <span
                                style={{
                                    color: '#667eea',
                                    cursor: "pointer",
                                    fontWeight: '600',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#764ba2';
                                    e.target.style.textDecoration = 'underline';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#667eea';
                                    e.target.style.textDecoration = 'none';
                                }}
                                onClick={() => setIsCreateAccount(false)}
                            >
                                Sign In Here
                            </span>
                        </p>
                    ) : (
                        <p className='text-muted mb-0' style={{ fontSize: '0.9rem' }}>
                            Don't have an account?{' '}
                            <span
                                style={{
                                    color: '#667eea',
                                    cursor: "pointer",
                                    fontWeight: '600',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#764ba2';
                                    e.target.style.textDecoration = 'underline';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#667eea';
                                    e.target.style.textDecoration = 'none';
                                }}
                                onClick={() => setIsCreateAccount(true)}
                            >
                                Sign Up Here
                            </span>
                        </p>
                    )}
                </div>
            </div>

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
        </div>
    )
}

export default Login