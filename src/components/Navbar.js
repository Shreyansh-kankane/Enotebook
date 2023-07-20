import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import userContext from '../context/user/userContext';
import { useContext } from 'react';
// import jwt_decode from 'jwt-decode'
import { toast } from 'react-hot-toast';

function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout successfully")
    localStorage.removeItem('token')
    navigate('/login')
  }
  const { user, initializeUser } = useContext(userContext);
  useEffect(()=>{
    initializeUser();
  },[])

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className='d-flex col w-25justify-content-around align-items-center'>
            <Link className="nav-link text-white fw-bold mr-1" to="/">e-notes</Link>
            <Link className={`nav-link text-white mx-2 ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            <Link className={`nav-link text-white mx-1 ${location.pathname === "/about" ? "active" : ""}`} to="about">About</Link>
          </div>
          <div className='d-flex justify-content-end align-items-center'>
            {!localStorage.getItem('token') ?
              <form className='d-flex'>
                {location.pathname === "/login" ?
                  <Link className='btn btn-primary mx-2' to="/SignUp" role="button">Sign Up</Link>
                  :
                  <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                }
              </form>
              :
              <>
                <img src={user.picture} className='rounded-circle shadow-4-strong img-cover' style={{height:"30px",width:"30px"}} alt="" />
                <button className='btn btn-primary mx-2' onClick={handleLogout}>Logout</button>
              </>
            }
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar

Navbar.prototype = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired
}

Navbar.defaultProps = {
  title: "Your-Title",
  about: "About",
  mode: 'dark'
}
