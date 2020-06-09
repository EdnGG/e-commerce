const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
    res.send({ hello: "World" })
})

const server = app.listen(7000, () => {
    console.log(`listening on http://localhost:${server.address().port}`);
})