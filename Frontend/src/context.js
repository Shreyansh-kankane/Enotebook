import React from "react";

import { useContext } from "react";
const AppContext = React.createContext();


const AppProvider = ({children}) =>{

    return <AppContext.Provider value="">{children}</AppContext.Provider>
};

const useGlobalContext=()=>{
    return useContext(AppContext);
};

export {AppContext,AppProvider,useGlobalContext}
// import { useContext,useState,useEffect } from "react";
    // const s1 = {
    //     name:"shreyansh",
    //     age:"19"
    // }
    // const [state,setState] = useState(s1);
    // const update=()=>{
    //     setTimeout(() => {
    //         setState({
    //             name:"abhi",
    //             age: "20"
    //         })
    //     }, 5000);
    // }
    // useEffect(() => {
    //     update();
    // }, []);