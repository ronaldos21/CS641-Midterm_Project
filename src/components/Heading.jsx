import React from "react";
import { toggleDarkMode } from "../darkModeUtils";

function Heading() {
    return (
        <header>
            <h1> Ronaldo Simbana Keeper App</h1>
            <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
        </header>
    );
}

export default Heading;
