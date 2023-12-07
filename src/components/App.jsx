// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import axios from "axios";
import Heading from "./Heading";
import Footer from "./Footer";
import Notes from "./Notes";
import NoteArea from "./NoteArea";
import SignInPage from "./SignInPage";
import { onAuthStateChanged, signOut, getRedirectResult } from 'firebase/auth';
import { auth } from '../firebase';

function App() {
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch notes from the server
        //axios.get("http://localhost:5001/api/notes")
        axios.get(process.env.REACT_APP_MONGODB_URI + "/api/notes")
            .then(response => {
                setNotes(response.data);
            })
            .catch(error => {
                console.error("Error fetching notes:", error);
            });

        // Handle the redirect result
        getRedirectResult(auth)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                setUser(user);
            })
            .catch((error) => {
                console.error('Error handling redirect:', error);
            });

        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);

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
        <Router>
            <Routes>
                <Route path="/app/*" element={
                    user ? (
                        <div>
                            <Heading />
                            <p>WELCOME, {user.displayName}!</p>
                            <button onClick={() => signOut(auth)}>Sign Out</button>
                            <NoteArea onAdd={addingNote} />
                            {notes.map((noteItm, index) => (
                                <Notes
                                    key={index}
                                    id={index}
                                    title={noteItm.title}
                                    content={noteItm.content}
                                    onDelete={deletingNote}
                                />
                            ))}
                            <Footer />
                        </div>
                    ) : (
                        <Navigate to="/signin" />
                    )
                } />
                {/* Default route (wildcard) redirect to sign-in page*/}
                <Route path="*" element={<Navigate to="/signin" />} />
                <Route path="/signin" element={<SignInPage />} />
            </Routes>
        </Router>
    );
}

export default App;
