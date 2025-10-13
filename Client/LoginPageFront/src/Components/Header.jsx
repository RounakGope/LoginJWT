import { useState, useContext } from 'react';
import header from '../assets/header.png'
import { AppContext } from '../context/AppContext';

const Header = () => {
    const { userData } = useContext(AppContext);
    const [showInfo, setShowInfo] = useState(false);

    const handleGetStarted = () => {
        setShowInfo(!showInfo);
        if (!showInfo) {
            setTimeout(() => {
                document.getElementById('tech-info')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    };

    return (
        <>
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center py-5 px-3 position-relative overflow-hidden" 
                 style={{
                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                     minHeight: '100vh'
                 }}>
                
                {/* Decorative background elements */}
                <div style={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    top: '-200px',
                    left: '-200px',
                    filter: 'blur(40px)'
                }} />
                <div style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '50%',
                    bottom: '-150px',
                    right: '-150px',
                    filter: 'blur(40px)'
                }} />

                <div className="text-center position-relative z-2" style={{ maxWidth: '600px' }}>
                    {/* Header Image */}
                    <div style={{
                        marginBottom: '2rem',
                        animation: 'bounce 3s ease-in-out infinite'
                    }} className="mb-4">
                        <img 
                            src={header} 
                            alt="header" 
                            width={130} 
                            style={{
                                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2))',
                                transition: 'transform 0.3s ease'
                            }}
                            className="img-fluid"
                        />
                    </div>

                    {/* Greeting */}
                    <h5 className='fw-semibold mb-3' style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '1.1rem',
                        letterSpacing: '0.5px',
                        animation: 'fadeInUp 0.8s ease 0.2s both'
                    }}>
                        Hey {userData ? userData.name : "Developer"} 
                        <span role='img' aria-label="wave" style={{ marginLeft: '0.5rem', display: 'inline-block' }}>
                            👋
                        </span>
                    </h5>

                    {/* Main Title */}
                    <h1 className='fw-bold mb-4' style={{
                        fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                        color: '#ffffff',
                        lineHeight: '1.2',
                        marginBottom: '2rem',
                        animation: 'fadeInUp 0.8s ease 0.4s both',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                    }}>
                        Welcome To Authentify
                    </h1>

                    {/* Description */}
                    <p className='fw-light mb-5' style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                        lineHeight: '1.6',
                        animation: 'fadeInUp 0.8s ease 0.6s both',
                        maxWidth: '420px',
                        margin: '0 auto 2.5rem'
                    }}>
                        A secure authentication system built with JWT and Spring Security
                    </p>

                    {/* CTA Button */}
                    <button 
                        onClick={handleGetStarted}
                        className='btn btn-light rounded-pill px-5 py-2 fw-semibold'
                        style={{
                            background: '#ffffff',
                            color: '#667eea',
                            border: 'none',
                            fontSize: '1rem',
                            letterSpacing: '0.5px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                            animation: 'fadeInUp 0.8s ease 0.8s both'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        {showInfo ? 'Hide Details' : 'Get Started'} 
                    </button>
                </div>

                <style>{`
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }
                    
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(50px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </div>

            {/* Technology Information Section */}
            {showInfo && (
                <div 
                    id="tech-info"
                    className="py-5 px-3"
                    style={{
                        background: '#f8f9fa',
                        animation: 'slideIn 0.6s ease'
                    }}
                >
                    <div className="container" style={{ maxWidth: '1100px' }}>
                        <div className="row g-4">
                            {/* JWT Section */}
                            <div className="col-md-6">
                                <div className="card h-100 border-0 shadow-sm" style={{
                                    borderRadius: '16px',
                                    transition: 'transform 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '15px'
                                            }}>
                                                <span style={{ fontSize: '1.5rem' }}>🔐</span>
                                            </div>
                                            <h3 className="fw-bold mb-0" style={{ color: '#667eea' }}>
                                                JWT Authentication
                                            </h3>
                                        </div>
                                        
                                        <p className="text-muted mb-3" style={{ lineHeight: '1.6' }}>
                                            JSON Web Tokens provide a secure, stateless way to handle user authentication in modern applications[web:3].
                                        </p>

                                        <h6 className="fw-semibold mb-2" style={{ color: '#333' }}>
                                            Key Benefits:
                                        </h6>
                                        <ul className="text-muted mb-3" style={{ lineHeight: '1.8' }}>
                                            <li><strong>Stateless & Scalable:</strong> Server doesn't need to store session data, making it ideal for distributed systems[web:3]</li>
                                            <li><strong>Compact & Efficient:</strong> Lightweight tokens reduce overhead during data transmission[web:3]</li>
                                            <li><strong>Self-Contained:</strong> Carries all necessary user information within the token payload[web:12]</li>
                                            <li><strong>Cross-Platform:</strong> Compatible with various programming languages and frameworks[web:3]</li>
                                            <li><strong>Enhanced Security:</strong> Signature verification ensures tokens haven't been tampered with[web:3]</li>
                                        </ul>

                                        <h6 className="fw-semibold mb-2" style={{ color: '#333' }}>
                                            Common Use Cases:
                                        </h6>
                                        <ul className="text-muted" style={{ lineHeight: '1.8' }}>
                                            <li>Single Sign-On (SSO) solutions[web:12]</li>
                                            <li>Mobile and IoT applications[web:3]</li>
                                            <li>Secure information exchange between parties[web:12]</li>
                                            <li>RESTful API authentication[web:8]</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Spring Security Section */}
                            <div className="col-md-6">
                                <div className="card h-100 border-0 shadow-sm" style={{
                                    borderRadius: '16px',
                                    transition: 'transform 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '15px'
                                            }}>
                                                <span style={{ fontSize: '1.5rem' }}>🛡️</span>
                                            </div>
                                            <h3 className="fw-bold mb-0" style={{ color: '#764ba2' }}>
                                                Spring Security
                                            </h3>
                                        </div>
                                        
                                        <p className="text-muted mb-3" style={{ lineHeight: '1.6' }}>
                                            A powerful framework for securing Java applications with comprehensive authentication and authorization features[web:10].
                                        </p>

                                        <h6 className="fw-semibold mb-2" style={{ color: '#333' }}>
                                            Core Features:
                                        </h6>
                                        <ul className="text-muted mb-3" style={{ lineHeight: '1.8' }}>
                                            <li><strong>Authentication & Authorization:</strong> Verifies user identity and manages access permissions[web:10]</li>
                                            <li><strong>Protection Against Threats:</strong> Built-in defense against CSRF, XSS, session fixation, and clickjacking[web:10]</li>
                                            <li><strong>Password Encoding:</strong> Secure password hashing using BCrypt algorithm[web:16]</li>
                                            <li><strong>Method-Level Security:</strong> Secure specific methods using @PreAuthorize and @Secured annotations[web:10]</li>
                                            <li><strong>JWT Integration:</strong> Seamless support for stateless authentication with JWT tokens[web:10]</li>
                                        </ul>

                                        <h6 className="fw-semibold mb-2" style={{ color: '#333' }}>
                                            Why Spring Security?
                                        </h6>
                                        <ul className="text-muted" style={{ lineHeight: '1.8' }}>
                                            <li>Seamless integration with Spring Boot[web:10]</li>
                                            <li>Flexible authentication mechanisms[web:10]</li>
                                            <li>Enterprise-level features (OAuth2, LDAP)[web:10]</li>
                                            <li>Comprehensive security filters and interceptors[web:8]</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Implementation Highlight */}
                            <div className="col-12 mt-4">
                                <div className="card border-0 shadow-sm" style={{
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white'
                                }}>
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h4 className="fw-bold mb-3">
                                                🚀 JWT + Spring Security Implementation
                                            </h4>
                                            <p className="mb-3" style={{ lineHeight: '1.6', opacity: '0.95' }}>
                                                This application combines the power of JWT's stateless authentication with Spring Security's robust protection mechanisms to create a secure, scalable authentication system[web:8][web:11].
                                            </p>
                                            <div className="row text-start g-3">
                                                <div className="col-md-4">
                                                    <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                                        <h6 className="fw-semibold mb-2">✅ User Registration</h6>
                                                        <small style={{ opacity: '0.9' }}>Secure password encryption and storage in MySQL database[web:8]</small>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                                        <h6 className="fw-semibold mb-2">✅ Token Generation</h6>
                                                        <small style={{ opacity: '0.9' }}>JWT tokens issued upon successful authentication[web:11]</small>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                                        <h6 className="fw-semibold mb-2">✅ OTP Verification</h6>
                                                        <small style={{ opacity: '0.9' }}>Email-based one-time password for enhanced security[web:27][web:33]</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* OTP Verification Section */}
                            <div className="col-12 mt-4">
                                <div className="card border-0 shadow-sm" style={{
                                    borderRadius: '16px',
                                    transition: 'transform 0.3s ease'
                                }}>
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '15px'
                                            }}>
                                                <span style={{ fontSize: '1.5rem' }}>📧</span>
                                            </div>
                                            <h3 className="fw-bold mb-0" style={{ color: '#FF6B6B' }}>
                                                Email OTP Verification
                                            </h3>
                                        </div>
                                        
                                        <p className="text-muted mb-3" style={{ lineHeight: '1.6' }}>
                                            One-Time Password verification adds an extra layer of security by requiring users to enter a unique, time-sensitive code sent to their registered email address[web:25][web:27].
                                        </p>

                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <h6 className="fw-semibold mb-2" style={{ color: '#333' }}>
                                                    Security Benefits:
                                                </h6>
                                                <ul className="text-muted mb-3" style={{ lineHeight: '1.8' }}>
                                                    <li><strong>Enhanced Protection:</strong> OTP adds an additional authentication layer beyond passwords, making unauthorized access significantly harder[web:25][web:28]</li>
                                                    <li><strong>Protection Against Phishing:</strong> Time-sensitive and unique codes reduce the risk of phishing and replay attacks[web:26][web:29]</li>
                                                    <li><strong>Account Takeover Prevention:</strong> Even if passwords are compromised, attackers need access to the user's email[web:25][web:30]</li>
                                                    <li><strong>Real-Time Verification:</strong> Instant code generation and delivery ensures immediate authentication[web:29][web:30]</li>
                                                </ul>
                                            </div>

                                            <div className="col-md-6">
                                                <h6 className="fw-semibold mb-2" style={{ color: '#333' }}>
                                                    User Experience Benefits:
                                                </h6>
                                                <ul className="text-muted mb-3" style={{ lineHeight: '1.8' }}>
                                                    <li><strong>User-Friendly Process:</strong> Familiar and convenient authentication method that users can easily understand[web:25][web:28]</li>
                                                    <li><strong>No Additional Apps:</strong> Works with existing email infrastructure without requiring authenticator apps[web:27][web:31]</li>
                                                    <li><strong>Global Reliability:</strong> Email OTP provides better international coverage compared to SMS-based alternatives[web:27][web:31]</li>
                                                    <li><strong>Cost-Effective:</strong> Lower per-transaction costs while maintaining high security standards[web:25][web:28]</li>
                                                </ul>
                                            </div>

                                            <div className="col-12">
                                                <div className="p-3 rounded" style={{ background: '#f8f9fa', border: '2px solid #e9ecef' }}>
                                                    <h6 className="fw-semibold mb-2" style={{ color: '#333' }}>
                                                        How It Works in Authentify:
                                                    </h6>
                                                    <div className="row g-3 text-muted">
                                                        <div className="col-md-3">
                                                            <div className="text-center">
                                                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>1️⃣</div>
                                                                <strong>User Registration</strong>
                                                                <p className="small mb-0 mt-1">User creates account with email address</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="text-center">
                                                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>2️⃣</div>
                                                                <strong>Code Generation</strong>
                                                                <p className="small mb-0 mt-1">System generates unique 6-digit OTP[web:33]</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="text-center">
                                                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>3️⃣</div>
                                                                <strong>Email Delivery</strong>
                                                                <p className="small mb-0 mt-1">OTP sent securely to registered email[web:27]</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="text-center">
                                                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>4️⃣</div>
                                                                <strong>Account Verification</strong>
                                                                <p className="small mb-0 mt-1">User enters code to verify account[web:30]</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="alert alert-info mb-0" style={{ borderRadius: '12px', border: 'none', background: '#E3F2FD' }}>
                                                    <div className="d-flex align-items-start">
                                                        <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>💡</span>
                                                        <div>
                                                            <strong style={{ color: '#1976D2' }}>Security Best Practice:</strong>
                                                            <p className="mb-0 text-muted mt-1">
                                                                OTP codes in Authentify expire after a short time period and can only be used once, ensuring maximum security. This compliance with multi-factor authentication (MFA) standards helps protect user accounts from unauthorized access[web:26][web:30].
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header;
