import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { Index } from "../pages/Index"
import { Show } from "../pages/Show"

const URL = "https://notes-u3.herokuapp.com/notes/"
export const Main = (props) => {
    const [notes, setNote] = useState([])

    const getNote = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        console.log(data)
        setNote(data)
    }

    const createNote = async (note) => {
        const newNoteData = await fetch(URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        const newNote = await newNoteData.json()
        setNote((prevNotes) => [...prevNotes, newNote])
    }

    const updateNote = async (note, id) => {
        await fetch(URL + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        })
        getNote()
    }

    const deleteNote = async (id) => {
        await fetch(URL + id, {
            method: "delete",
        })
        getNote()
    }

    useEffect(() => { getNote() }, [])

    return (
        <main>
            <Routes>
                <Route path="/" element=
                    {<Index
                        notes={notes}
                        createNote={createNote}
                        deleteNote={deleteNote}
                    />}
                />
                <Route path="/notes/:id" element=
                    {<Show
                        notes={notes}
                        updateNote={updateNote}
                        deleteNote={deleteNote}
                    />}
                />
            </Routes>
        </main>
    )
}