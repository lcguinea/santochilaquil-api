const axios = require('axios');
require('dotenv').config();

const SQUARE_URL = 'https://connect.squareup.com/v2/customers';
const TOKEN = process.env.SQUARE_ACCESS_TOKEN;

async function crearClienteEnSquare(data) {
  try {
    const res = await axios.post(SQUARE_URL, {
      given_name: data.nombre,
      family_name: data.apellidos,
      email_address: data.email,
      phone_number: data.telefono,
      address: {
        address_line_1: data.calle,
        locality: data.ciudad,
        administrative_district_level_1: data.provincia,
        postal_code: data.codigo_postal,
        country: 'ES'
      },
      birthday: data.fecha_nacimiento, // formato YYYY-MM-DD
      reference_id: data.numero_iva
    }, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    return res.data.customer;
  } catch (err) {
    console.error('Error al crear cliente en Square:', err.response?.data || err.message);
    throw err;
  }
}

module.exports = { crearClienteEnSquare };
