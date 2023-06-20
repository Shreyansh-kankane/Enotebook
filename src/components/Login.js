import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/alert/AlertContext'
import { toast } from 'react-hot-toast'

import { BASE_URI } from '../helper'

const Login = (props) => {
    const {showAlert} = useContext(AlertContext)
    const [credential, setCredential] = useState({email: "", password: ""}) 
    let navigate = useNavigate();

    const onChange = (e)=>{
        setCredential({...credential, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BASE_URI}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credential.email, password: credential.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.Success){
            // Save the auth token and redirect
            // showAlert("Loged-in Successfully", "success")
            toast.success("Login Successfully");
            localStorage.setItem('token', json.authToken); 
            navigate('/');
        }
        else{
            // showAlert("Please enter correct credentials", "danger")
            toast.error("Please enter correct credentials");
            return;
        }
    }

    return (
        <div className='container my-4'>
            <h2>Login to Enotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-4">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' aria-describedby="email" placeholder="Enter email" autoComplete='off' value={credential.email} onChange={onChange}/>
                    <small id="email" className="form-text text-muted my-2">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-4">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" autoComplete='off'value={credential.password}  onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Login
