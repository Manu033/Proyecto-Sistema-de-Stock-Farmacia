const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Importar middleware
const verifyToken = require("./src/middlewares/authMiddleware");
// Conexion a la base de datos
const sequelize = require("./src/utils/sequelizeDbConnection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//Importar rutas
app.use("/auth", require("./src/routes/authRoutes"));
app.use("/products", require("./src/routes/productRoutes"));
// const authRoutes = require('./src/routes/authRoutes'); // Adjust the path as necessary

// Ruta principal
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Protected route
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
