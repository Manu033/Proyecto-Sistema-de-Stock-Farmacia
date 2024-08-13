const express = require('express');
const app = express();
const port = 3000;

//Importar rutas
app.use('/auth', require('./src/routes/auth'));

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
