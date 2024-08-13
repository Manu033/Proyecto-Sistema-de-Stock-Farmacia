const mysql = require("mysql");

// Connect with database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "galleryimages",
});

db.connect(function (err) {
  if (err) {
    console.log("Fallo conexion base de datos");
  } else {
    console.log("exitos");
  }
});

module.exports = db;