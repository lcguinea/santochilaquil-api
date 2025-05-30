const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
console.log('DEBUG: process.env.PORT =', process.env.PORT);
console.log('DEBUG: Usando puerto:', PORT);

app.get('/', (req, res) => {
  res.send('API de prueba funcionando');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
