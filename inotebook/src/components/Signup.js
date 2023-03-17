import React ,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../Context/alert/AlertContext'

const Signup = (props) => {
    const host = 'http://localhost:5000'
    const {showAlert} = useContext(AlertContext);

    const [credential,setCredential] = useState({name:"",email:"",password:"",cpassword:""});
    let navigate = useNavigate();

    const onChange=(e)=>{
        setCredential({...credential, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e)=>{

        e.preventDefault()

        // API Call for creating new user
        if(credential.password !== credential.cpassword ){
            // alert("Incorrect password")
            showAlert("Please re-enter password correctly", "danger")
        }
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credential.name, email:credential.email, password:credential.password })
        });
        const json = await response.json();
        console.log(json)
        if(json.Success) {
            localStorage.setItem('token',json.authToken)
            navigate('/')
            showAlert("Account created successfully", "success")
        }   
        else{
            showAlert("Invalid details", "danger")
        }
    }
    return (
        <>
        <section className="vh-100" style={{ backgroundColor : "#eee"}}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius:"25px"}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="name" className="form-control" name="name" minLength={3} required onChange={onChange}  />
                                                    <label className="form-label" htmlFor="name">Your Name</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" id="email" className="form-control" name="email" onChange={onChange} />
                                                    <label className="form-label" htmlFor="email">Your Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="password" className="form-control" name='password'minLength={6} required onChange={onChange} />
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="cpassword" className="form-control" name="cpassword" minLength={6} required onChange={onChange} />
                                                    <label className="form-label" htmlFor="cpassword">Repeat your password</label>
                                                </div>
                                            </div>


                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="agree" />
                                                <label className="form-check-label" htmlFor="agree">
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Signup
