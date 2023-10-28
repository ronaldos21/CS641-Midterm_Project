import React, { useState } from "react";
import Heading from "./Heading";
import Footer from "./Footer";
import Notes from "./Notes";
import NoteArea from "./NoteArea";

function App() {
    const [notes, setNotes] = useState([]);

    function addingNote(newNote) {
        setNotes((previousNote) => {
            return [...previousNote, newNote];
        });
    }

    function deletingNote(id) {
        setNotes((previousNote) => {
            return previousNote.filter((noteItm, index) => {
                return index !== id;
            });
        });
    }

    return (
        <div>
            <Heading />
            <NoteArea onAdd={addingNote} />
            {notes.map((noteItm, index) => {
                return (
                    <Notes
                        key={index}
                        id={index}
                        title={noteItm.title}
                        content={noteItm.content}
                        onDelete={deletingNote}
                    />
                );
            })}
            <Footer />
        </div>
    );
}

export default App;
