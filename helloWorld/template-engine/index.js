const express = require("express")
const app = express()
const expressJsx = require('./express-jsx.js')

app.engine("jsx", expressJsx)
app.set("views", "./views");
app.set("view engine", "jsx")

app.get('/', (req, res, ) => {
    res.render("index", { hello: "HELLO", world: "WORLD" })
})

const server = app.listen(8000, () => {
    console.log(`Listening on http://localhost:${server.address().port}`);
})