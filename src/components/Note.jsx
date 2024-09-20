import React, { useState, useEffect } from "react";
import axios from "axios";

const Note = () => {
    const [newNote, setNewNote] = useState('');
    const [allNotes, setAllNotes] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        axios.get('http://localhost:3001/notes/')
            .then(response => {
                setAllNotes(response.data);
            })
            .catch(error => {
                console.error('Error al cargar las notas:', error);
                setErrorMessage('Error al cargar las notas');
            });
    };

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(allNotes));
    }, [allNotes]);

    useEffect(() => {
        console.log('Notas actualizadas:', allNotes);
    }, [allNotes]);

    const notesToShow = showAll ? allNotes : allNotes.filter(note => note.important);

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const deleteAllNotes = () => {
        if (allNotes.length === 0) {
            console.log('No hay notas para eliminar.');
            return;
        }

        const deletePromises = allNotes.map(note =>
            axios.delete(`http://localhost:3001/notes/${note.id}`)
                .catch(error => {
                    console.error(`Error al eliminar la nota con ID ${note.id}:`, error);
                    setErrorMessage(`Error al eliminar la nota con ID ${note.id}`);
                })
        );

        Promise.all(deletePromises)
            .then(() => {
                setAllNotes([]); // Vaciar manualmente el estado de las notas
                setNewNote('');
                setErrorMessage('');
                localStorage.removeItem('notes'); // Limpiar localStorage
            })
            .catch(error => {
                console.error('Error al eliminar las notas:', error);
                setErrorMessage('Error al eliminar las notas');
            });
    };

    const addNote = (event) => {
        event.preventDefault();

        if (newNote.trim() === '') {
            setErrorMessage('Debe insertar un mensaje');
            return;
        }
        

        axios.post('http://localhost:3001/notes',{ content: newNote, important: newNote.length >= 10 })
            .then(response => {
                setAllNotes(prevNotes => [...prevNotes, response.data]);
                setNewNote('');
                setErrorMessage('');
            })
            .catch(error => {
                console.error('Error al guardar la nota:', error);
                setErrorMessage('Error al guardar la nota');
            });
    };

    const toggleImportanceOf = (id) => {
        const url = `http://localhost:3001/notes/${id}`;
        const note = allNotes.find(n => n.id === id);
        const changedNote = { ...note, important: !note.important };

        axios.put(url, changedNote)
            .then(response => {
                setAllNotes(allNotes.map(note => note.id !== id ? note : response.data));
            })
            .catch(error => {
                console.error('Error al actualizar la nota:', error);
                setErrorMessage('Error al actualizar la nota');
            });
    };

    const compNotes = () => {
        setShowAll(false);
    };

    const todasNotas = () => {
        setShowAll(true);
    };

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={todasNotas}>
                    Show All
                </button>
                <button onClick={compNotes}>
                    Comparar Notas (Show Important)
                </button>
            </div>

            <ul>
                {notesToShow.map(note => (
                    <li className="note" key={note.id}>
                        {note.content} <strong>{note.important ? "(Important)" : ""}</strong>
                        <button onClick={() => toggleImportanceOf(note.id)}>
                            Toggle Importance
                        </button>
                    </li>
                ))}
            </ul>

            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">Save</button>
                <button type="button" onClick={deleteAllNotes}>Delete All Notes</button>
            </form>
  
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Note;