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
    const rol = document.getElementById('email').value;
    const clave = document.getElementById('password').value;

    let response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rol,
            clave,
        }), // Enviar datos en JSON
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    response = await response.json();
    if(response.length){
        window.location.href = "../Pagina-Principal/PaginaPrincipal.html";

    }else{
        alert("Usuario o contraseña incorrectos");
    }
} catch (err) {
    console.error('Error adding food to table:', err);
}

  form2.reset();
});


// DECLARANDO VARIABLE
var contenedor_login_register = document.querySelector(".contenedor__login_register")
var formulario_login = document.querySelector(".formulario_login")
var formulario_registro = document.querySelector(".formulario_registro")
var caja_trasera_login = document.querySelector(".caja_trasera_login")
var caja_trasera_register = document.querySelector(".caja_trasera_register")


const usuario =async ()=>{
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('correo').value;
    const rol = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;

    try {
      let response = await fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          email,
          rol,
          clave
        }), // Enviar datos en JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      response = await response.json();
      console.log('Usuario creado:', response);
    alert("Usuario creado correctamente");
    } catch (err) {
      console.error('Error creando usuario:', err);
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

