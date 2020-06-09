const express = require("express");
const path = require("path");

// const bodyParser = require("body-parser");
const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");

// App
const app = express();

// Middlewares
// app.use(bodyParser.json()); // usando modulo body-parse
app.use(express.json()); // En express nativo

// static files
app.use("/static", express.static(path.join(__dirname, "public")));
// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

// Redirect
app.get("/", function (req, res) {
  res.redirect("/products");
});

//  Server
const server = app.listen(7000, () => {
  console.log(`listening on http://localhost:${server.address().port}`);
});
