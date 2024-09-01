import React, { useState, useEffect } from "react";

const Note = ({ initialNotes }) => {
    const [newNote, setNewNote] = useState('');
    const [allNotes, setAllNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Cargar notas desde localStorage al montar el componente
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        // Solo establecer notas iniciales si localStorage está vacío
        if (savedNotes.length === 0 && initialNotes) {
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

    // Función para eliminar todas las notas
    const deleteAllNotes = (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del botón dentro del formulario
        setAllNotes([]); // Limpiar el estado
        setNewNote(''); // Limpiar el estado del campo de entrada
        setErrorMessage(''); // Limpiar cualquier mensaje de error existente
        localStorage.removeItem('notes'); // Eliminar las notas de localStorage
    };

    // Función para manejar el submit del formulario
    const addNote = (event) => {
        event.preventDefault();

        if (newNote.trim() === '') {
            setErrorMessage('Debe insertar un mensaje');
            return; // No agregar notas vacías
        } else if (newNote.length < 3) {
            setErrorMessage('La nota debe tener mas de 3 caracteres');
            return;
        }

        // Manejar el true o false
        const important = newNote.length >= 10;

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
            important: important
        };

        setAllNotes(prevNotes => [...prevNotes, noteObject]); // Agregar la nueva nota al estado
        setNewNote(''); // Limpiar el input
        setErrorMessage(''); // Limpiar cualquier mensaje de error existente
    };

    return (
        <div>
            <h1>Notes</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <ul>
                {allNotes.map(note => (
                    <li key={note.id}>{note.content}</li>
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">Save</button>
                <button type="button" onClick={deleteAllNotes}>Delete All Notes</button> {/* Botón para eliminar todas las notas */}
            </form>
        </div>
    );
};

export default Note;
