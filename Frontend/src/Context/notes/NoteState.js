import React, { useContext, useState } from "react";
import NoteContext from "./NoteContext";
import AlertContext from "../alert/AlertContext";
require("dotenv").config();

const NoteState = (props) => {

    const host = "http://localhost:80"
    const {showAlert} = useContext(AlertContext)

    const notesInitial = [];

    const [notes,setNotes] = useState(notesInitial);


    // for fetching all notes
    const getNotes = async ()=>{
        // API Call to fetch all notes
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            },
        });
        const jsonResData = await response.json();
        setNotes(jsonResData);
    }


    // To Add a Note
    const addNote = async (title,description,tag)=>{

        // API Call to add a new note
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const jsonData = await response.json();

        //adding new note logic
        const note = jsonData;
        setNotes(notes.concat(note));
        showAlert("Note added successfully","success")
    };

     // edit an existing note
     const editnote = async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
          });
          const json = await response.json();
          console.log(json)

          let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < notes.length; index++) {
            const ele = notes[index];
            if(ele._id===id){
              newNotes[index].title=title;
              newNotes[index].description=description;
              newNotes[index].tag=tag;
              break;
            } 
        }
        setNotes(newNotes);
        showAlert("Note edited successfully","success")
    };

    // for deleting a note
    const deletenote = async (id)=>{
        // Api call to delete note with this id
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
          });
          const json = await response.json();
          console.log(json)

        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
        showAlert("Note deleted successfully","success")
    }

  return (
    <NoteContext.Provider value={{notes,getNotes,addNote,editnote,deletenote}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState



    // const s = {
    //     "name": "abhi",
    //     "age": "19"
    // };
    //make s state variable
    // const [state, setState] = useState(s);

    //update function to setState of s1
    // const update = () => {
    //     setTimeout(()=> {
    //         setState({
    //             "name": "Larry",
    //             "age": "200"
    //         })
    //     }, 3000);
    // }