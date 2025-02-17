const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'admin',
  database: 'Internet_Banking'
});

client.connect(err => {
  if (err) {
    console.error('No se ha podido conectar a la Base de Datos:', err);
  } else {
    console.log('Conectado exitosamente a la Base de Datos');
  }
});

// Aquí puedes añadir más lógica para realizar operaciones con la base de datos

// Desconectar cuando hayas terminado
client.end();
