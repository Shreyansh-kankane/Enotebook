import React, { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
    const [alert,setalert]=useState(null);

    const showAlert=(message,type)=>{
    setalert({
        msg:message,
        type:type
    });
    setTimeout(() => {
        setalert(null);
    }, 1500);
};
  return (
    <AlertContext.Provider value={{alert,showAlert}}>
        {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState


