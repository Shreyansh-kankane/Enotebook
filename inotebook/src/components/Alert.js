import React from 'react'

function Alert(props) {
  const capitalise=(word)=>{
    if(word==="danger") {
        word="Error"
    }
    let newWord = word.charAt(0).toUpperCase() + word.slice(1);
    return newWord;
  };
  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" >
      <strong>{capitalise(props.alert.type)} : {props.alert.msg}</strong>
    </div>
  )
};

export default Alert