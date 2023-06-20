import React, {useContext, useState} from 'react'
import NoteContext from "../context/notes/NoteContext"
import AlertContext from '../context/alert/AlertContext';
import Notes from './Notes';
import { toast } from 'react-hot-toast';

const AddNote = () => {
    // const context = useContext(NoteContext);
    const {showAlert} = useContext(AlertContext);
    const {addNote} = useContext(NoteContext);

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        // showAlert("Add note successfully","success");
        // toast.success("Note added successfully");
        setNote({title: "", description: "", tag: ""});
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
            <Notes/>
        </div>
        
        </>
    )
}

export default AddNote
