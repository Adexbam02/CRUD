require("dotenv").config()
const cors = require("cors")
const express = require("express")
const connectDB = require("./connectDB")
const notes = require("./models/notes")

const app = express()
const PORT = process.env.PORT || 5000

connectDB()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Get all notes
app.get("/api/notes", async (req, res) => {
    try {
        const data = await notes.find({})

        if (!data) {
            throw new Error("An error occur while fetching the data")
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "An error occur while fetching the data" })
    }
})


// Get notes by id
app.get("/api/notes/:id", async (req, res) => {
    try {
        const noteId = req.params.id

        const data = await notes.findById(noteId)

        if (!data) {
            throw new Error("An error occur while fetching the data")
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "An error occur while fetching the data" })
    }
})



// create note
app.post("/api/notes", async (req, res) => {
    try {
        const { title, description } = req.body


        const data = await notes.create({ title, description })

        if (!data) {
            throw new Error("An error occur while creating the note")
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "An error occur while creating the note" })
    }
})



// Update Note
app.put("/api/notes/:id", async (req, res) => {
    try {
        const noteId = req.params.id
        const { title, description } = req.body
        const data = await notes.findByIdAndUpdate(noteId, { title, description })

        if (!data) {
            throw new Error("An error occur while updating the note")
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "An error occur while updating the note" })
    }
})

// Delete Note
app.delete("/api/notes/:id", async (req, res) => {
    try {
        const noteId = req.params.id
        // const { title, description } = req.body
        const data = await notes.findByIdAndDelete(noteId)

        if (!data) {
            throw new Error("An error occur while deleting the note")
        }

        res.status(200).json(data)
        console.log(`${noteId} deleted succesfully`)
    } catch (error) {
        res.status(500).json({ error: "An error occur while deleting the note" })
    }
})











app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(PORT, () => {
    console.log(`Server is Up & Running at port: ${PORT}`)
})