import React, {useContext,useEffect,useRef,useState} from 'react'
import NoteContext from "../context/notes/NoteContext"
import AlertContext from '../context/alert/AlertContext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = () => {

    const {notes,getNotes,editnote} = useContext(NoteContext);
    const {showAlert} = useContext(AlertContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const closeRef = useRef(null);

    const [enote, esetNote] = useState({id:"", etitle: "", edescription: "", etag: ""});
    const updateNote = (currentNote) => {
        esetNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
        ref.current.click();
    };
    const handleUpdClick = (e)=>{
        // console.log("Updating the note...",enote);
        showAlert("Note updated successfully","success")
        e.preventDefault(); 
        editnote(enote.id,enote.etitle,enote.edescription,enote.etag);
        closeRef.current.click();
    };
    const onChange = (e)=>{
        esetNote({...enote, [e.target.name]: e.target.value})
    };


    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={enote.etitle} aria-describedby="emailHelp" onChange={onChange} autoComplete="off"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={enote.edescription} onChange={onChange} autoComplete="off"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={enote.etag} onChange={onChange} autoComplete="off"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  disabled={enote.etitle.length<3 || enote.edescription.length<5} onClick={handleUpdClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

        <div className="row my-3">
            <h2>Your Notes</h2>
            {notes.length===0 && <div className='container'>
                No Notes to display
            </div>}
            {notes.map((note)=>{
                return <Noteitem key={note._id} note={note} updateNote={updateNote}/>  
            })}
        </div>
    </>
    )
}

export default Notes