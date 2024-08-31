import React, { useState } from "react";

const Note = ({ notes }) => {
    const [newNote, setNewNote] = useState(''); // Estado para la nueva nota
    const [allNotes, setAllNotes] = useState(notes); // Estado para todas las notas

    // Función para manejar el cambio de input
    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    // Función para manejar el submit del formulario
    const addNote = (event) => {
        event.preventDefault();

        const noteObject = {
            id: allNotes.length + 1, // Generar un nuevo ID
            content: newNote,
            important: false // Podrías agregar más propiedades aquí si es necesario
        };

        setAllNotes(allNotes.concat(noteObject)); // Agregar la nueva nota al estado
        setNewNote(''); // Limpiar el input
    };

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {allNotes.map(note => (
                    <li key={note.id}>{note.content}</li>
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">Agregar Nota</button>
            </form>
        </div>
    );
};

export default Note;
