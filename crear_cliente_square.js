const axios = require('axios');

const ACCESS_TOKEN = 'EAAAl4tiYCdYqxp0lgMSWIgX25E1sEwXapRZdpOySYukQm2a1hFA5ySgu0Z_ndYR';
const SQUARE_API_BASE = 'https://connect.squareup.com/v2';

const headers = {
  'Authorization': `Bearer ${ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

async function crearClienteSquare({
  nombre,
  apellidos,
  email,
  telefono,
  direccion,
  codigoPostal,
  ciudad,
  provincia,
  fechaNacimiento, // formato: 'YYYY-MM-DD'
  numeroIVA
}) {
  try {
    const res = await axios.post(`${SQUARE_API_BASE}/customers`, {
      given_name: nombre,
      family_name: apellidos,
      email_address: email,
      phone_number: telefono,
      birthday: fechaNacimiento,
      address: {
        address_line_1: direccion,
        postal_code: codigoPostal,
        locality: ciudad,
        administrative_district_level_1: provincia,
        country: 'ES'  // España
      },
      note: `NIF/IVA: ${numeroIVA}`
    }, { headers });

    const cliente = res.data.customer;

    console.log('✅ Cliente creado en Square:');
    console.log(`🆔 ID: ${cliente.id}`);
    console.log(`👤 ${cliente.given_name} ${cliente.family_name}`);
    console.log(`📧 ${cliente.email_address}`);

    return cliente.id;

  } catch (error) {
    if (error.response) {
      console.error('❌ Error en respuesta de Square:', error.response.data);
    } else {
      console.error('❌ Error al conectar:', error.message);
    }
    return null;
  }
}

// 👉 Prueba con datos reales
crearClienteSquare({
  nombre: 'Juan Carlos',
  apellidos: 'Guinea Larrazábal',
  email: 'jcguinea.es@gmail.com',
  telefono: '+34666111222',
  direccion: 'Calle Falsa 123',
  codigoPostal: '28004',
  ciudad: 'Madrid',
  provincia: 'Madrid',
  fechaNacimiento: '1980-05-15',
  numeroIVA: '16830408C'
});
