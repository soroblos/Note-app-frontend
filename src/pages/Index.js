import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
export default (props) => {
    const navigate = useNavigate()
    const [newForm, setNewForm] = useState({
        name: '',
        image: '',
        description: '',
    })

    const handleChange = (e) => {
        setNewForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.createNote(newForm)
        setNewForm({
            name: '',
            image: '',
            description: ''
        })
    }

    const handleDelete = (noteId) => {
        props.deleteNote(noteId)
        navigate('/')
    }

    const Loaded = () => {
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString()
        }
        return props.notes.map((note) => {
            return (
                <div className="notescontainer">
                    <Link to={`/notes/${note._id}`}>
                        {note && (
                            <div key={note._id} className='note'>
                                <img className="pushpin" src='https://www.freeiconspng.com/thumbs/pushpin-png/pushpin-png-27.png' />
                                <h1>{note.name}</h1>
                                {note.image && (
                                    <img src={note.image} alt={note.name} />
                                )}
                                <p>{note.description}</p>
                            </div>
                        )}
                    </Link>
                    <button id='deleteHome' onClick={() => handleDelete(note._id)}>
                    </button>
                    <p className="date">Created at:{formatDate(note.createdAt)}</p>
                </div>
            )
        })
    }
    const Loading = () => {
        return <h1>loading...</h1>
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={newForm.name}
                    name='name'
                    placeholder="name"
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={newForm.image}
                    name='image'
                    placeholder="image"
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={newForm.description}
                    name='description'
                    placeholder="description"
                    onChange={handleChange}
                />
                <input type='submit' value='New Note' />
            </form>
            {props.notes.length > 0 ? <Loaded /> : <Loading />}
        </section>
    )
}