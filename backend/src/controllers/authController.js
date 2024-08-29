const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("./../../models");

// Registro de usuario
// authController.js
const registerUser = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;

    // Verificar que los campos no estén vacíos
    if (!name || !password || !email || !role) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Encriptar la contraseña
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = await User.create({
      name,
      password: encryptedPassword,
      email,
      role,
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error al registrar el usuario", error });
  }
};

// Inicio de sesión de usuario
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Comparar la contraseña ingresada con la encriptada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Crear y enviar el token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

const verifyToken = async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.status(200).json({
        message: "Token válido",
        authData,
      });
    }
  });
};

module.exports = { registerUser, loginUser, verifyToken };
