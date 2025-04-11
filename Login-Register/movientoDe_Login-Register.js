// alert("Hello world!");
document.addEventListener('DOMContentLoaded', () => {
    // Botones de navegación
    document.getElementById("btn-registarse").addEventListener("click", register);
    document.getElementById("btn-iniciar_sersion").addEventListener("click", iniciarsesion);
    
    // Formularios
    const formLogin = document.getElementById("formulario_login");
    const formRegistro = document.getElementById("formulario_registro");

    // Evento para el formulario de login
    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            const cedula = document.getElementById('cedula').value;
            const contrasena = document.getElementById('password').value;

            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cedula,
                    contrasena,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Error en el inicio de sesión');
            }
            
            if (result.id) {
                localStorage.setItem('id', result.id);
                window.location.href = "../BANKING-MENU_usuario/menuac.html";
            } else {
                alert("Cédula o contraseña incorrectos");
            }
        } catch (err) {
            alert("Error al iniciar sesión: " + err.message);
        } finally {
            formLogin.reset();
        }
    });

    // Evento para el formulario de registro
    formRegistro.addEventListener("submit", async (e) => {
        e.preventDefault();
        await usuario();
        formRegistro.reset();
    });

    // Ajuste inicial del ancho de página
    anchodepagina();
});

// Función de registro de usuario
async function usuario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('correo').value;
    const rol = document.getElementById('usuario').value;
    const cedula = document.getElementById('cedulaa').value;
    const clave = document.getElementById('clave').value;
    
    try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
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
        iniciarsesion();
        
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        alert("Error al registrar usuario: " + err.message);
    }
}

// Función para ajustar el ancho de página
function anchodepagina() {
    if (window.innerWidth > 850) {
        caja_trasera_login.style.display = "block";
        caja_trasera_register.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        formulario_registro.style.display = "none";
        contenedor_login_register.style.left = "0px";
    }
}

// Función para mostrar el formulario de login
function iniciarsesion() {
    if (window.innerWidth > 850) {
        formulario_registro.style.display = "none";
        contenedor_login_register.style.left = "10px";
        formulario_login.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_registro.style.display = "none";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "block";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}

// Función para mostrar el formulario de registro
function register() {
    if (window.innerWidth > 850) {
        formulario_registro.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_registro.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}

// Event listener para el redimensionamiento de la ventana
window.addEventListener("resize", anchodepagina);

const formImpuestos = document.getElementById("form-impuestos");
formImpuestos.addEventListener("submit", async function (e) {
    e.preventDefault();

    const tipoImpuesto = document.getElementById("tipo-impuesto").value;
    const numeroReferencia = document.getElementById("numero-referencia").value;
    const montoImpuesto = document.getElementById("monto-impuesto").value;
    const cuentaPago = document.getElementById("cuenta-pago").value;

    try {
        // Obtener el ID del usuario desde localStorage
        const userId = localStorage.getItem('id');
        
        if (!userId) {
            console.error('ID de usuario no encontrado en localStorage');
            alert('Error: No se pudo identificar al usuario');
            return;
        }

        const response = await fetch(`http://localhost:3000/api/servicios/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipo_de_impuesto: tipoImpuesto,
                numero_referencia: numeroReferencia,
                monto: parseFloat(montoImpuesto),
                cuenta_pago: cuentaPago
            })
        });

        if (response.ok) {
            alert('Pago de servicio realizado con éxito');
            
            // Mostrar la pantalla de estado y actualizar saldos
            ocultarSecciones();
            inicio.style.display = "block";
            await actualizarSaldos();
            
            // Esperar un momento y volver a la sección de impuestos con datos actualizados
            setTimeout(() => {
                ocultarSecciones();
                impuestos.style.display = "block";
                cargarHistorialServicios();
            }, 1500);
            
            formImpuestos.reset();
        } else {
            const errorData = await response.json();
            alert('Error en el pago: ' + (errorData.message || 'Error desconocido'));
        }
    } catch (error) {
        console.error('Error al realizar el pago:', error);
        alert('Error al realizar el pago. Por favor, intente nuevamente.');
    }
});

// DECLARANDO VARIABLE
const contenedor_login_register = document.querySelector(".contenedor__login_register");
const formulario_login = document.querySelector(".formulario_login");
const formulario_registro = document.querySelector(".formulario_registro");
const caja_trasera_login = document.querySelector(".caja_trasera_login");
const caja_trasera_register = document.querySelector(".caja_trasera_register");

