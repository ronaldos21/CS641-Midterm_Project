const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://ronaldoismael15:12345@cluster0.41xflul.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Capture the success event when the connection is open
mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB successfully!");
});

// Capture the error event when the connection encounters an error
mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

// Define Note schema
const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Note = mongoose.model("Note", noteSchema);

// API endpoint for fetching notes
app.get("/api/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// API endpoint for adding a new note
app.post("/api/notes", async (req, res) => {
    const { title, content } = req.body;

    try {
        const newNote = new Note({ title, content });
        await newNote.save();
        res.json(newNote);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
