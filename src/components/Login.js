import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import AlertContext from '../context/alert/AlertContext'
import { toast } from 'react-hot-toast'
import jwt_decode from 'jwt-decode';

import userContext from '../context/user/userContext';
import { BASE_URI } from '../helper'

import dotenv from 'dotenv';

dotenv.config();


const Login = (props) => {

    const { setUser } = useContext(userContext);
    // global google
    async function handleCallbackResponse(response) {
        // console.log("encoded jwt, "+ response.credential);
        let userObj = jwt_decode(response.credential);
        setUser({ name: userObj.name, email: userObj.email, picture: userObj.picture });
        localStorage.setItem('google-token', response.credential);

        const res = await fetch(`${BASE_URI}/api/auth/google/signIn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: userObj.name, email: userObj.email })
        });
        const json = await res.json();
        // console.log(json);
        if (json.authToken) {
            toast.dismiss();
            toast.success("Login Successfully");
            localStorage.setItem('token', json.authToken);
            navigate('/');
        }
        else {
            toast.dismiss();
            toast.error("error when signin");
            return;
        }
    }
    const client_id = process.env.GOOGLE_CLIENT_ID;
    console.log(client_id);

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse
        });
        window.google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        )
        window.google.accounts.id.prompt();
    }, [])


    // const {showAlert} = useContext(AlertContext)
    const [credential, setCredential] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.loading("loading...");
        const response = await fetch(`${BASE_URI}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json()
        // console.log(json);
        if (json.Success) {
            // Save the auth token and redirect
            // showAlert("Loged-in Successfully", "success")
            toast.dismiss();
            toast.success("Login Successfully");
            localStorage.setItem('token', json.authToken);
            navigate('/');
        }
        else {
            // showAlert("Please enter correct credentials", "danger")
            toast.dismiss();
            toast.error("Please enter correct credentials");
            return;
        }
    }

    return (
        <section className="vh-100">
            <div className="container-fluid h-100">
                <div className="h-100 w-100 row d-flex justify-content-center align-items-center ">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="draw2.webp"
                            className="img-fluid" alt="" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit}>
                            <p className="lead fw-bold mb-0 me-3 mb-4">Sign in to e-notebook</p>
                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control form-control-lg"
                                    placeholder="Enter a valid email address" name='email' value={credential.email} onChange={onChange} />
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                            </div>

                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                    placeholder="Enter password" name='password' value={credential.password} onChange={onChange} />
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">

                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                    style={{ paddingRight: "2.5rem", paddingLeft: "2.5rem" }}>Login
                                </button>
                            </div>

                            <div className="divider d-flex align-items-center justify-content-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0">Or</p>
                            </div>

                            <div className="d-flex flex-row align-items-center justify-content-center ">
                                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                {/* <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-twitter"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-linkedin-in"></i>
                                </button> */}
                                <div id="signInDiv"></div>
                            </div>
                            <p className="small fw-bold mt-2 pt-1 mb-0 d-flex justify-content-center">Don't have an account? <Link to="/SignUp"
                                className="link-danger">Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login

// <div className='container my-4'>
//     <h2>Login to Enotebook</h2>
//     <form onSubmit={handleSubmit}>
//         <div className="form-group my-4">
//             <label htmlFor="email">Email address</label>
//             <input type="email" className="form-control" id="exampleInputEmail1" name='email' aria-describedby="email" placeholder="Enter email" autoComplete='off' value={credential.email} onChange={onChange}/>
//             <small id="email" className="form-text text-muted my-2">We'll never share your email with anyone else.</small>
//         </div>
//         <div className="form-group my-4">
//             <label htmlFor="password">Password</label>
//             <input type="password" className="form-control" id="password" name='password' placeholder="Password" autoComplete='off'value={credential.password}  onChange={onChange}/>
//         </div>
//         <button type="submit" className="btn btn-primary my-2">Submit</button>
//     </form>
// </div>
