const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  //TODO Implementar LOGICA Y CONTROL DE USERS con base de datos
  if (req.body.user == "maximo" && req.body.password == "maximo") {
    res.statusCode = 200;
    res.send({ success: true, user: req.body.user, token: "123456" });
  } else {
    res.statusCode = 203;
    res.send({ error: true, message: "Invalid Credentials." });
  }
});

module.exports = router;