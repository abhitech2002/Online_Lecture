const express = require('express')

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    console.log(req)
    return res.status(200).send("Hello World!")
} )

const PORT = 3000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
