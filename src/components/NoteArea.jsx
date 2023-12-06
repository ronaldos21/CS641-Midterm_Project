import React, { useState } from "react";
import axios from "axios";

function NoteArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((previousNote) => {
      return {
        ...previousNote,
        [name]: value
      };
    });
  }

  function submitedNote(event) {
    // Send new note to the server
    axios.post("http://localhost:5001/api/notes", note)
      .then(response => {
        props.onAdd(response.data);
      })
      .catch(error => {
        console.error("Error adding note:", error);
      });


    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }
  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitedNote}>Add Note</button>
      </form>
    </div>
  );
}
export default NoteArea;
