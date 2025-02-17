const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/register', async (req, res) => {
  const { nombre_completo, correo, usuario, contrasena } = req.body;

  // try {
  //   // Verificar que el correo no se repita
  //   const checkEmailQuery = 'SELECT * FROM usuarios WHERE correo = $1';
  //   const checkEmailValues = [correo];
  //   const emailResult = await client.query(checkEmailQuery, checkEmailValues);

  //   if (emailResult.rows.length > 0) {
  //     // El correo ya está registrado
  //     return res.send(`
  //       <script>
  //         alert("Este correo ya está registrado");
  //         window.location = "../index.html";
  //       </script>
  //     `);
  //   }
    
    // Verificar que el usuario no se repita
    const checkUserQuery = 'SELECT * FROM usuarios WHERE usuario = $1';
    const checkUserValues = [usuario];
    const userResult = await client.query(checkUserQuery, checkUserValues);

    // if (userResult.rows.length > 0) {
    //   // El usuario ya está registrado
    //   return res.send(`
    //     <script>
    //       alert("Este usuario ya está registrado");
    //       window.location = "../index.html";
    //     </script>
    //   `);
    // }

    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Insertar el nuevo usuario
    const insertQuery = 'INSERT INTO usuarios (nombre_completo, correo, usuario, contrasena) VALUES ($1, $2, $3, $4)';
    const insertValues = [nombre_completo, correo, usuario, hashedPassword];

    //   await client.query(insertQuery, insertValues);
  //   res.send(`
  //     <script>
  //       alert("Usuario almacenado exitosamente");
  //       window.location = "../index.html";
  //     </script>
  //   `);
  // } catch (err) {
  //   console.error('Error ejecutando la consulta', err.stack);
  //   res.send(`
  //     <script>
  //       alert("Inténtalo de nuevo, hubo un error");
  //       window.location = "../index.html";
  //     </script>
  //   `);
  // }

});



// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});


  