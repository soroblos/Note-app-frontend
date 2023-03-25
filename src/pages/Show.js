import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export const Show = (props) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const notes = props.notes
    const note = notes.find((n) => n._id === id)

    const [editForm, setEditForm] = useState(note || {})

    const handleChange = (e) => {
        setEditForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateNote(editForm, id)
        navigate('/')
    }

    const handleDelete = () => {
        props.deleteNote(id)
        navigate('/')
    }


    return (
        <>
            <section>
                <div className='notes'>
                    {note && (
                        <>

                            <h1 className="showH1">{note.name}</h1>
                            {note.image && (
                                <img src={note.image} alt={note.name} />
                            )}
                            <p>{note.description}</p>
                        </>
                    )}
                    <button id='deleteShow' onClick={handleDelete}>
                    </button>
                </div>
            </section>
            <form className="indexForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={editForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={editForm.image}
                    name="image"
                    placeholder="image URL"
                    onChange={handleChange}
                />
                <textarea
                    cols="30"
                    type="text"
                    value={editForm.description}
                    name="description"
                    placeholder="description"
                    onChange={handleChange}
                />
                <input type="submit" value="Edit Note" />
            </form>
        </>
    )
}