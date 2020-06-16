const express = require("express");
const path = require("path");
const boom = require("boom");
const debug = require("debug")("app:server");
const helmet = require("helmet");
// const bodyParser = require("body-parser");
const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");
const authApiRouter = require("./routes/api/auth");

const {
  errorHandler,
  wrapErrors,
  clientErrorHandler,
  logErrors,
} = require("./utils/middlewares/errorsHandlers");

const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi");

// App
const app = express();

// Middlewares
// app.use(bodyParser.json()); // usando modulo body-parse
app.use(helmet());
app.use(express.json()); // En express nativo

// static files
app.use("/static", express.static(path.join(__dirname, "public")));
// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//routes
app.use("/products", productsRouter);
//app.use("/api/products", productsApiRouter);
productsApiRouter(app);
app.use("/api/auth", authApiRouter);

// Redirect
app.get("/", function (req, res) {
  res.redirect("/products");
});

app.use(function (req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { stautsCode, payload },
    } = boom.notFound();
    res.status(statusCode).json(payload);
  }
  res.status(404).render("404");
});

// Los middleware errors de express deben de ir al final
// de todas las rutas

// Middleware Errors handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

//  Server
const server = app.listen(7000, () => {
  debug(`listening on http://localhost:${server.address().port}`);
});
