import React, { useState, useEffect } from "react";

const Note = ({ initialNotes }) => {
    const [newNote, setNewNote] = useState('');
    const [allNotes, setAllNotes] = useState([]);

    // Cargar notas desde localStorage al montar el componente
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        // Solo establecer notas iniciales si localStorage está vacío
        if (savedNotes.length === 0) {
            setAllNotes(initialNotes);
        } else {
            setAllNotes(savedNotes);
        }
    }, [initialNotes]);

    // Guardar notas en localStorage solo cuando cambian
    useEffect(() => {
        console.log('Saving notes to localStorage:', allNotes);
        localStorage.setItem('notes', JSON.stringify(allNotes));
    }, [allNotes]);

    // Función para manejar el cambio de input
    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    // Función para manejar el submit del formulario
    const addNote = (event) => {
        event.preventDefault();

        if (newNote.trim() === '') return; // No agregar notas vacías

        // Verificar IDs existentes y generar un nuevo ID único
        const existingIds = new Set(allNotes.map(note => note.id));
        let newId = 1;

        while (existingIds.has(newId)) {
            newId++;
        }

        console.log('New ID for the note:', newId);

        const noteObject = {
            id: newId,
            content: newNote,
            important: false
        };

        setAllNotes(prevNotes => [...prevNotes, noteObject]); // Agregar la nueva nota al estado
        setNewNote(''); // Limpiar el input
    };

        // Función para eliminar todas las notas
        const deleteAllNotes = () => {
            setAllNotes([]); // Limpiar el estado
            localStorage.removeItem('notes'); // Eliminar las notas de localStorage
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
                <button type="submit">save</button>
                <button onClick={deleteAllNotes}>Delete All Notes</button> {/* Botón para eliminar todas las notas */}
            </form>
        </div>
    );
};

export default Note;
