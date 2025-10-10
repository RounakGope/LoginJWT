import header from '../assets/header.png'
const Header = ()=> {
 
    return (
       <div className="text-center d-flex flex-column align-items-center justify-content-center py-5 px-3 " style={{minHeight:"80vh"}}>
        <img src={header} alt="header" width={130} className="mb-4" />
        <h5 className='fw-semibold'>
            Hey Everyone <span role='img' aria-level="wave">👌</span>
        </h5>
        <h1 className='fw-bold display-5 mb-3'>Welcome To My Website

        </h1>
        <p className='text-muted fs-5 mb-4' style={{maxWidth:"400px"}}>
            Get Ready To Experience My Website

        </p>
        <button className='btn btn-outline-dark rounded-pill px-4 py-2'>
            Get Started 
        </button>

       </div>
    )
}
export default Header;