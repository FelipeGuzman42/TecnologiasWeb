let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let cors = require("cors");

let indexRouter = require("./routes/index");
let alimentoRouter = require("./routes/alimentoRouter");
let citaMedicaRouter = require("./routes/citaMedicaRouter");
let dietaRouter = require("./routes/dietaRouter");
let entradaRouter = require("./routes/entradaRouter");
let historiaClinicaRouter = require("./routes/historiaClinicaRouter");
let nutricionistaRouter = require("./routes/nutricionistaRouter")["router"];
let platoRouter = require("./routes/platoRouter");
let progresoRouter = require("./routes/progresoRouter");
let resenaRouter = require("./routes/resenaRouter");
let usuarioRouter = require("./routes/usuarioRouter");
let loginRouter = require("./routes/loginRouter");

let app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));

app.use("/", indexRouter);
app.use("/", alimentoRouter);
app.use("/", citaMedicaRouter);
app.use("/", dietaRouter);
app.use("/", entradaRouter);
app.use("/historiaClinica", historiaClinicaRouter);
app.use("/", nutricionistaRouter);
app.use("/", platoRouter);
app.use("/progreso", progresoRouter);
app.use("/", usuarioRouter);
app.use("/", resenaRouter);
app.use("/api", loginRouter);

module.exports = app;
