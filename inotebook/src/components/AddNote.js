import React, { useContext,useState } from 'react'
import NoteContext from '../Context/notes/NoteContext'
import AlertContext from '../Context/alert/AlertContext';
import Notes from './Notes';

const AddNote = () => {
    const {addNote} = useContext(NoteContext);
    const {showAlert} = useContext(AlertContext);

    const [note,setNote] = useState({title:"",description:"",tag:""});

    const handleAddClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        showAlert("Add note successfully","success");
        setNote({title:"",description:"",tag:""});
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

  return (
    <div className="container">
        <h2>Add a Note</h2>
        <form className="my-3">
            <div className="mb-3">
                <label htmlFor='title' className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} autoComplete="off"/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange} autoComplete="off"/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">tag</label>
                <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} autoComplete="off"/>
            </div>
            <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleAddClick}>Add</button>
        </form>
        <Notes/>
    </div>
  )
}

export default AddNote
