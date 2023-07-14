import React, { useContext, useEffect, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const { deletenote } = useContext(NoteContext);
    const [date,setDate] = useState(null);
    useEffect(() => {
        function getDate() {
            let date = new Date(note.date).toLocaleString();
            setDate(date);
        }
        getDate();
    }, [note]);


    return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title} <small className='text-primary'>{note.tag}</small> </h5>
                        <p className="card-text">{note.description}</p>
                        <p className='card-text'>{date} </p>
                        <i className="fa-solid fa-trash mx-2" onClick={() => deletenote(note._id)}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updateNote(note)}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem
