// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Obtener el token del encabezado de la solicitud
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar los datos del usuario a la solicitud
    req.user = decoded;

    // Continuar con la siguiente función del middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado.", error });
  }
};

module.exports = authMiddleware;
