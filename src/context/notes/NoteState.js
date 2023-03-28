// import NoteContext from "./NoteContext";
// import { useState } from "react";

// const NoteState = (props) => {
//   const host = "http://localhost:5000"
//   const notesInitial = []
//   const [notes, setNotes] = useState(notesInitial)

//   // Get all Notes
//   const getNotes = async () => {
//     // API Call 
//     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
//       }
//     });
//     const json = await response.json() 
//     setNotes(json)
//   }

//   // Add a Note
//   const addNote = async (title, description, tag) => {
//     // TODO: API Call
//     // API Call 
//     const response = await fetch(`${host}/api/notes/addnote`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
//       },
//       body: JSON.stringify({title, description, tag})
//     });

//     const note = await response.json();
//     setNotes(notes.concat(note))
//   }

//   // Delete a Note
//   const deleteNote = async (id) => {
//     // API Call
//     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
//       }
//     });
//     const json = response.json(); 
//     const newNotes = notes.filter((note) => { return note._id !== id })
//     setNotes(newNotes)
//   }

//   // Edit a Note
//   const editNote = async (id, title, description, tag) => {
//     // API Call 
//     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
//       },
//       body: JSON.stringify({title, description, tag})
//     });
//     const json = await response.json(); 

//      let newNotes = JSON.parse(JSON.stringify(notes))
//     // Logic to edit in client
//     for (let index = 0; index < newNotes.length; index++) {
//       const element = newNotes[index];
//       if (element._id === id) {
//         newNotes[index].title = title;
//         newNotes[index].description = description;
//         newNotes[index].tag = tag; 
//         break; 
//       }
//     }  
//     setNotes(newNotes);
//   }

//   return (
//     <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
//       {props.children}
//     </NoteContext.Provider>
//   )

// }
// export default NoteState;
import React, { useContext, useState } from "react";
import NoteContext from "./NoteContext";
import AlertContext from "../alert/AlertContext";
require("dotenv").config();

const NoteState = (props) => {

    const {showAlert} = useContext(AlertContext)
    const notesInitial = [];
    const [notes,setNotes] = useState(notesInitial);

    // for fetching all notes
    const getNotes = async ()=>{
        // API Call to fetch all notes
        const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
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
        const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
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
        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
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
        const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
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

export default NoteState;



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
