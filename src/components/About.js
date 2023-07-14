import React from 'react'
import { Link } from 'react-router-dom'
const About = () => { 
    return (
        <>
        <section className="vh-100">
            <div className="container-fluid h-100">
                <div className="h-100 w-100 row d-flex justify-content-center align-items-center ">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <div className="card">
                            <div className="card-body">
                                <h4>A Step towards sustainable development</h4>
                                    <p className="card-text">e-notebook is an innovative application designed to revolutionize the way we organize and store information, while also promoting paperless practices and contributing to a more sustainable future. With e-Notebook, users can conveniently save anything from shopping lists and to-do tasks to important notes and creative ideas, all within a digital environment.
                                    </p>
                                    <p>e-Notebook offers features that further enhance its paper-friendly nature. Users can easily create, edit, and organize digital notes, ensuring a clutter-free experience. The application provides options to categorize, tag and Users can also synchronize their e-notebook across devices, allowing access to their digital notes from smartphones, tablets, or computers, reducing the need for multiple physical notebooks.</p>

                                    <Link to="/" className="btn btn-primary btn-lg btn-block">Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default About
