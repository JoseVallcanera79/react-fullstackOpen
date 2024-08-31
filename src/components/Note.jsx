import React from "react";

const Note = ({ notes }) => {
    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>{note.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Note;
