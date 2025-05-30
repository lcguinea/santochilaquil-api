const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const { crearClienteEnSquare } = require('./square');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'https://santochilaquil.es'
}));
app.use(express.json());

const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: 5432,
  ssl: process.env.PG_SSL ? { rejectUnauthorized: false } : false
});

client.connect();

app.post('/registro', async (req, res) => {
  const datos = req.body;

  try {
    const clienteSquare = await crearClienteEnSquare(datos);

    await client.query(`
      INSERT INTO clientes (nombre, apellidos, email, telefono, calle, codigo_postal, ciudad, provincia, fecha_nacimiento, numero_iva, square_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    `, [
      datos.nombre,
      datos.apellidos,
      datos.email,
      datos.telefono,
      datos.calle,
      datos.codigo_postal,
      datos.ciudad,
      datos.provincia,
      datos.fecha_nacimiento,
      datos.numero_iva,
      clienteSquare.id
    ]);

    res.json({ mensaje: 'Cliente registrado con éxito', clienteSquare });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar cliente', detalles: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
