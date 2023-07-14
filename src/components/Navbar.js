import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.success("Logout successfully")
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className='d-flex col w-25justify-content-around align-items-center'>
            <Link className="navbar-brand font-weight-bold mx-2" to="/">e-noteebook</Link>
            <Link className={`nav-link text-white mx-2 ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            <Link className={`nav-link text-white mx-2 ${location.pathname === "/about" ? "active" : ""}`} to="about">About</Link>
          </div>
          <div className='d-flex justify-content-end'>
            {!localStorage.getItem('token') ?
              <form className='d-flex'>
                {location.pathname === "/login" ?
                  <Link className='btn btn-primary mx-2' to="/SignUp" role="button">Sign Up</Link>
                  :
                  <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                }
              </form>
              :
              <button className='btn btn-primary mx-3' onClick={handleLogout}>Logout</button>
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
