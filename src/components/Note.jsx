import React, { useState, useEffect } from "react";
import axios from "axios";


const Note = ({ initialNotes }) => {
    const [newNote, setNewNote] = useState('');
    const [allNotes, setAllNotes] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // Cargar notas desde localStorage al montar el componente
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        if (savedNotes.length === 0) {
            setAllNotes(initialNotes);
        } else {
            setAllNotes(savedNotes);
        }
    }, [initialNotes]);

    // Guardar notas en localStorage solo cuando cambian
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(allNotes));
    }, [allNotes]);

    // Filtrar las notas a mostrar basadas en el estado showAll
    const notesToShow = showAll ? allNotes : allNotes.filter(note => note.important);

    // Manejar cambios en el input de nueva nota
    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    // Función para eliminar todas las notas
    const deleteAllNotes = () => {
        setAllNotes([]);
        setNewNote('');
        setErrorMessage('');
        localStorage.removeItem('notes');
    };

    // Función para manejar el submit del formulario
    const addNote = (event) => {
        event.preventDefault();


        if (newNote.trim() === '') {
            setErrorMessage('Debe insertar un mensaje');
            return;
        }

        // Generar un ID único para la nueva nota
        const existingIds = new Set(allNotes.map(note => note.id));
        let newId = 1;
        while (existingIds.has(newId)) {
            newId++;
        }

        const noteObject = {
            id: newId,
            content: newNote,
            important: Math.random() > 0.5  // Importancia aleatoria
        };

        //Devolver nueva nota al db.json
        axios   
         .post('http://localhost:3001/notes', noteObject)   
         .then(response => {     
             console.log(response)    })

            
        setAllNotes(prevNotes => [...prevNotes, noteObject]);
        setNewNote('');
        setErrorMessage('');
    };



    // Función para filtrar y mostrar solo las notas importantes
    const compNotes = () => {

        <div>
            <button onClick={() => setShowAll(true)}>
                Show All
            </button>
        </div>
        console.log('Filtrando notas importantes:', allNotes.filter(note => note.important));

        setShowAll(false);
        // Cambiar el estado para mostrar solo las importantes
    };
    const todasNotas = () => {
        <button type="button" onClick={compNotes}>
            Comparar Notas (Show Important)
        </button>
        console.log('Filtrando notas:', allNotes)


    }


    return (
        <div>
            <h1>Notes</h1>

            <div>
                <button onClick={() => { todasNotas(); setShowAll(true) }}>
                    Show All
                </button>
                <button type="button" onClick={compNotes}>
                    Comparar Notas (Show Important)
                </button>

            </div>

            <ul>
                {notesToShow.map(note => (
                    <li key={note.id}>
                        {note.content} <strong>{note.important ? "(Important)" : ""}</strong>
                    </li>
                ))}
            </ul>

            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
                <button type="button" onClick={deleteAllNotes}>Delete All Notes</button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Note;
