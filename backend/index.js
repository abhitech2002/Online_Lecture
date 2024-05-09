const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userRoutes = require('./routes/user.routes');


dotenv.config()

const app = express()

app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI
mongoose
    .connect(MONGODB_URI)
    .then( () => {
        console.log("MongoDB connected")
    })
    .catch((error) => console.log(error))


app.get("/", (req, res) => {
    console.log(req)
    return res.status(200).send("Hello World!")
} )

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
