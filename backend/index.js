const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userRoutes = require('./routes/user.routes');
const courseroutes = require('./routes/course.routes')
const lectureRoutes = require('./routes/lecture.routes')
const cors = require('cors')


dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

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
app.use('/api/courses', courseroutes )
app.use('/api/lectures', lectureRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
