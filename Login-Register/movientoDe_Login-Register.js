// alert("Hello world!");
document.getElementById("btn-registarse").addEventListener("click", register);
document.getElementById("btn-iniciar_sersion").addEventListener("click", iniciarsesion);
window.addEventListener("resize",anchodepagina);

const form1 = document.getElementById("formulario_registro");
  form1.addEventListener("submit", async (e) => {
    e.preventDefault();
    // addFoodToTable();
    usuario();
    form1.reset();
    // loadClients(); // Refresca la lista de clientes
    // Mantener la pestaña activa
    // document.querySelector('.navbar ul li a[href="#clients"]').click();
  });

  
const form2 = document.getElementById("formulario_login");
form2.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const cedula = document.getElementById('cedula').value;
    const contrasena = document.getElementById('password').value;

    let response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cedula,
            contrasena,
        }),
    });

    if (!response.ok) {
        throw new Error('Error en el inicio de sesión');
    }

    const result = await response.json();
    
    if(result.id) {
        // Guardar el token en localStorage para futuras solicitudes autenticadas
        localStorage.setItem('id', result.id);
        // Redirigir a la página principal del banco
        window.location.href = "../BANKING-MENU/menuac.html";
    } else {
        alert("Cédula o contraseña incorrectos");
    }
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    alert("Error al iniciar sesión: " + err.message);
  }

  form2.reset();
});


// DECLARANDO VARIABLE
var contenedor_login_register = document.querySelector(".contenedor__login_register")
var formulario_login = document.querySelector(".formulario_login")
var formulario_registro = document.querySelector(".formulario_registro")
var caja_trasera_login = document.querySelector(".caja_trasera_login")
var caja_trasera_register = document.querySelector(".caja_trasera_register")


const usuario = async () => {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('correo').value;
    const rol = document.getElementById('usuario').value;
    const cedula = document.getElementById('cedula').value;
    const clave = document.getElementById('clave').value;

    try {
        // Nuevo endpoint para el registro de usuarios
        let response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: email,
                usuario: rol,
                cedula: cedula,
                contrasena: clave
            }),
        });

        if (!response.ok) {
            throw new Error('Error en el registro de usuario');
        }

        const result = await response.json();
        alert("Usuario registrado correctamente");
        
        // Redireccionar a la pantalla de login automáticamente
        iniciarsesion();
        
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        alert("Error al registrar usuario: " + err.message);
    }
}

function anchodepagina(){
    if(window.innerWidth>850){
        caja_trasera_login.style.display="block";
        caja_trasera_register.style.display="block";
    }else{
        caja_trasera_register.style.display="block";
        caja_trasera_register.style.opacity="1";
        caja_trasera_login.style.display= "none";
        formulario_login.style.display="block";
        formulario_registro.style.display="none";
        contenedor_login_register.style.left="0px";
    }
}

anchodepagina();

function iniciarsesion(){
    if(window.innerWidth > 850){
        formulario_registro.style.display = "none";
    contenedor_login_register.style.left="10px";
    formulario_login.style.display = "block";
    caja_trasera_register.style.opacity= "1";
    caja_trasera_login.style.opacity= "0";
    }else{
    formulario_registro.style.display = "none";
    contenedor_login_register.style.left="0px";
    formulario_login.style.display = "block";
    caja_trasera_register.style.display= "block";
    caja_trasera_login.style.display= "none";
    }
}

function register(){
    if(window.innerWidth>850){
        formulario_registro.style.display = "block";
        contenedor_login_register.style.left="410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity= "0";
        caja_trasera_login.style.opacity= "1"; 
    }else{
    formulario_registro.style.display = "block";
    contenedor_login_register.style.left="0px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.display= "none";
    caja_trasera_login.style.display= "block";
    caja_trasera_login.style.opacity= "1";
    }
}

