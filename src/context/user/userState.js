import React, { useState } from "react";
import userContext from "./userContext";
import jwt_decode from 'jwt-decode';


const UserState = (props) => {

    const [user, setUser] = useState({name: '',email: '', picture: ''});
    const initializeUser = ()=>{
        if (localStorage.getItem('google-token')){
            const token = localStorage.getItem('google-token');
            const userObj = jwt_decode(token);
            const myUser = {
                name: userObj.name,
                picture: userObj.picture,
                email: userObj.email,
            }
            setUser(myUser);
        }
        else return;
    }
    return (
        <userContext.Provider value={{ user,setUser,initializeUser }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;

