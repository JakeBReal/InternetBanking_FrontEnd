document.addEventListener("DOMContentLoaded", function () {
  // === Referencias a las secciones ===
  const bienvenida = document.getElementById("bienvenida");
  const inicio = document.getElementById("inicio");
  const transferencias = document.getElementById("transacciones");
  const tarjetas = document.getElementById("tarjetas");
  const impuestos = document.getElementById("impuestos");
  const cheques = document.getElementById("cheques");
  const serrucho = document.getElementById("serrucho");
  const deposito = document.getElementById("deposito");
  const perfil = document.getElementById("perfil");
  const correos = document.getElementById("correos");
  const admin = document.getElementById("admin");

  // Ocultar todas las secciones por defecto excepto Bienvenida
  [inicio, transferencias, tarjetas, impuestos, cheques, serrucho, deposito, perfil, correos, admin].forEach(sec => {
    if (sec) sec.style.display = "none";
  });
  bienvenida.style.display = "block";

  function ocultarSecciones() {
    [bienvenida, inicio, transferencias, tarjetas, impuestos, cheques, serrucho, deposito, perfil, correos, admin].forEach(sec => {
      if (sec) sec.style.display = "none";
    });
  }

  // =============================
  // Funciones de actualización y carga
  // =============================
  async function actualizarSaldos() {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        console.error('ID de usuario no encontrado en localStorage');
        return;
      }
      const response = await fetch(`http://localhost:3000/api/cuentas/${userId}`);
      const cuentas = await response.json();
      let saldoCorriente = "0";
      let saldoAhorro = "0";
      cuentas.forEach(cuenta => {
        if (cuenta.tipo_cuenta === "1") saldoCorriente = cuenta.monto;
        else if (cuenta.tipo_cuenta === "2") saldoAhorro = cuenta.monto;
      });
      const saldosCorriente = document.querySelectorAll('.account-box .balance');
      saldosCorriente[0].textContent = `$${saldoCorriente}`;
      saldosCorriente[1].textContent = `$${saldoAhorro}`;
    } catch (error) {
      console.error('Error al obtener los saldos:', error);
    }
  }

  async function cargarCuentasUsuario() {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        console.error('ID de usuario no encontrado en localStorage');
        return;
      }
      const response = await fetch(`http://localhost:3000/api/cuentas/${userId}`);
      const cuentas = await response.json();
      llenarSelectCuentas('origen', cuentas);
      llenarSelectCuentas('cuenta-pago', cuentas);
      llenarSelectCuentas('cuenta-deposito', cuentas);
    } catch (error) {
      console.error('Error al cargar las cuentas del usuario:', error);
    }
  }

  function llenarSelectCuentas(selectId, cuentas) {
    const select = document.getElementById(selectId);
    if (!select) return;
    const defaultOption = select.options[0];
    select.innerHTML = '';
    select.appendChild(defaultOption);
    cuentas.forEach(cuenta => {
      const option = document.createElement('option');
      option.value = cuenta.numero_cuenta;
      const tipoCuenta = cuenta.tipo_cuenta === "1" ? "Corriente" : "Ahorro";
      option.textContent = `${cuenta.numero_cuenta} - ${tipoCuenta} - $${cuenta.monto}`;
      select.appendChild(option);
    });
  }

  async function cargarHistorialServicios() {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        console.error('ID de usuario no encontrado en localStorage');
        return;
      }
      const response = await fetch(`http://localhost:3000/api/servicios/${userId}`);
      const servicios = await response.json();
      const serviciosList = document.getElementById("impuestos-list");
      serviciosList.innerHTML = '';
      servicios.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      servicios.forEach(s => {
        const fecha = new Date(s.fecha).toLocaleDateString();
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${s.tipo_de_impuesto}</td>
          <td>${s.numero_referencia}</td>
          <td>$${s.monto}</td>
          <td>${s.cuenta_pago}</td>
          <td>${fecha}</td>
        `;
        serviciosList.appendChild(row);
      });
    } catch (error) {
      console.error('Error al cargar el historial de servicios:', error);
    }
  }

  async function cargarHistorialDepositos() {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        console.error('ID de usuario no encontrado en localStorage');
        return;
      }
      const response = await fetch(`http://localhost:3000/api/depositos/${userId}`);
      const depositos = await response.json();
      const depositosList = document.getElementById("deposito-list");
      depositosList.innerHTML = '';
      depositos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      depositos.forEach(d => {
        const fecha = new Date(d.fecha).toLocaleDateString();
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${fecha}</td>
          <td>${d.numero_cuenta}</td>
          <td>$${d.monto}</td>
          <td>${d.referencia}</td>
          <td>${d.concepto}</td>
        `;
        depositosList.appendChild(row);
      });
    } catch (error) {
      console.error('Error al cargar el historial de depósitos:', error);
    }
  }

  async function cargarPerfil() {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        console.error('ID de usuario no encontrado en localStorage');
        return;
      }
      const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`);
      const usuario = await response.json();
      document.getElementById("profile-name").textContent = usuario.nombre || "";
      document.getElementById("profile-email").textContent = usuario.correo || "";
      document.getElementById("profile-phone").textContent = usuario.telefono || "";
      document.getElementById("profile-address").textContent = usuario.direccion || "";
      document.getElementById("profile-photo").src = usuario.foto || "https://via.placeholder.com/150";
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  }

  // Cargar pantalla inicial
  actualizarSaldos();
  cargarCuentasUsuario();
  cargarHistorialServicios();

  // =============================
  // Listeners del menú principal
  // =============================
  document.getElementById("inicio-btn").addEventListener("click", () => {
    ocultarSecciones();
    inicio.style.display = "block";
    actualizarSaldos();
  });

  document.getElementById("transacciones-btn").addEventListener("click", () => {
    ocultarSecciones();
    transferencias.style.display = "block";
    cargarTransacciones();
    cargarCuentasUsuario();
  });

  document.getElementById("tarjetas-btn").addEventListener("click", () => {
    ocultarSecciones();
    tarjetas.style.display = "block";
  });

  document.getElementById("impuestos-btn").addEventListener("click", () => {
    ocultarSecciones();
    impuestos.style.display = "block";
    cargarHistorialServicios();
    cargarCuentasUsuario();
  });

  document.getElementById("cheques-btn").addEventListener("click", () => {
    ocultarSecciones();
    cheques.style.display = "block";
  });

  document.getElementById("serrucho-btn").addEventListener("click", () => {
    ocultarSecciones();
    serrucho.style.display = "block";
  });

  document.getElementById("deposito-btn").addEventListener("click", () => {
    ocultarSecciones();
    deposito.style.display = "block";
    cargarHistorialDepositos();
    cargarCuentasUsuario();
  });

  document.getElementById("perfil-btn").addEventListener("click", () => {
    ocultarSecciones();
    perfil.style.display = "block";
    cargarPerfil();
  });

  document.getElementById("correos-btn").addEventListener("click", () => {
    ocultarSecciones();
    correos.style.display = "block";
  });

  document.getElementById("admin-btn").addEventListener("click", () => {
    ocultarSecciones();
    admin.style.display = "block";
  });

  // ======================
  // Manejo de Formularios
  // ======================

  // Transferencias
  const formTransferencias = document.getElementById("form-transacciones");
  if (formTransferencias) {
    formTransferencias.addEventListener("submit", async function(e) {
      e.preventDefault();
      const origen = document.getElementById("origen").value;
      const destino = document.getElementById("destino").value;
      const monto = document.getElementById("monto").value;
      const concepto = document.getElementById("concepto").value;
      try {
        const userId = localStorage.getItem('id');
        if (!userId) {
          alert('Error: No se pudo identificar al usuario');
          return;
        }
        const response = await fetch(`http://localhost:3000/api/cuentas/transaccion/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cuenta_origen: origen,
            cuenta_destino: destino,
            monto: parseFloat(monto),
            concepto: concepto
          })
        });
        if (response.ok) {
          alert('Transacción realizada con éxito');
          ocultarSecciones();
          inicio.style.display = "block";
          await actualizarSaldos();
          cargarTransacciones();
          formTransferencias.reset();
        } else {
          const errorData = await response.json();
          alert('Error en la transacción: ' + (errorData.message || 'Error desconocido'));
        }
      } catch (error) {
        console.error('Error al realizar la transacción:', error);
        alert('Error al realizar la transacción. Por favor, intente nuevamente.');
      }
    });
  }

  // Cheques
  const formCheques = document.getElementById("form-cheques");
  if (formCheques) {
    formCheques.addEventListener("submit", function(e) {
      e.preventDefault();
      const cuentaOrigen = document.getElementById("cuenta-origen").value;
      const numeroCheque = document.getElementById("numero-cheque").value;
      const montoCheque = document.getElementById("monto-cheque").value;
      const conceptoCheque = document.getElementById("concepto-cheque").value;
      const fecha = new Date().toLocaleDateString();
      let chequesList = document.getElementById("cheques-list");
      if (!chequesList) {
        chequesList = document.createElement("tbody");
        chequesList.id = "cheques-list";
        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cuenta Origen</th>
              <th>Número de Cheque</th>
              <th>Monto</th>
              <th>Concepto</th>
            </tr>
          </thead>
        `;
        table.appendChild(chequesList);
        cheques.appendChild(table);
      }
      const newCheque = document.createElement("tr");
      newCheque.innerHTML = `
        <td>${fecha}</td>
        <td>${cuentaOrigen}</td>
        <td>${numeroCheque}</td>
        <td>${montoCheque}</td>
        <td>${conceptoCheque}</td>
      `;
      chequesList.appendChild(newCheque);
      formCheques.reset();
    });
  }

  // Serrucho
  const formSerrucho = document.getElementById("form-serrucho");
  if (formSerrucho) {
    formSerrucho.addEventListener("submit", function(e) {
      e.preventDefault();
      const tipoSerrucho = document.getElementById("tipo-serrucho").value;
      const marcaSerrucho = document.getElementById("marca-serrucho").value;
      const cantidadSerrucho = document.getElementById("cantidad-serrucho").value;
      const descripcionSerrucho = document.getElementById("descripcion-serrucho").value;
      const fecha = new Date().toLocaleDateString();
      let serruchoList = document.getElementById("serrucho-list");
      if (!serruchoList) {
        serruchoList = document.createElement("tbody");
        serruchoList.id = "serrucho-list";
        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo de Serrucho</th>
              <th>Marca</th>
              <th>Cantidad</th>
              <th>Descripción</th>
            </tr>
          </thead>
        `;
        table.appendChild(serruchoList);
        serrucho.appendChild(table);
      }
      const newSerrucho = document.createElement("tr");
      newSerrucho.innerHTML = `
        <td>${fecha}</td>
        <td>${tipoSerrucho}</td>
        <td>${marcaSerrucho}</td>
        <td>${cantidadSerrucho}</td>
        <td>${descripcionSerrucho}</td>
      `;
      serruchoList.appendChild(newSerrucho);
      formSerrucho.reset();
    });
  }

  // Depósitos
  const formDeposito = document.getElementById("form-deposito");
  if (formDeposito) {
    formDeposito.addEventListener("submit", async function(e) {
      e.preventDefault();
      const cuentaDeposito = document.getElementById("cuenta-deposito").value;
      const montoDeposito = document.getElementById("monto-deposito").value;
      const referenciaDeposito = document.getElementById("referencia-deposito").value;
      const conceptoDeposito = document.getElementById("concepto-deposito").value;
      try {
        const userId = localStorage.getItem('id');
        if (!userId) {
          alert('Error: No se pudo identificar al usuario');
          return;
        }
        const response = await fetch(`http://localhost:3000/api/depositos/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            numero_cuenta: cuentaDeposito,
            monto: parseFloat(montoDeposito),
            referencia: referenciaDeposito,
            concepto: conceptoDeposito
          })
        });
        if (response.ok) {
          alert('Depósito realizado con éxito');
          ocultarSecciones();
          inicio.style.display = "block";
          await actualizarSaldos();
          setTimeout(() => {
            ocultarSecciones();
            deposito.style.display = "block";
            cargarHistorialDepositos();
            cargarCuentasUsuario();
          }, 1500);
          formDeposito.reset();
        } else {
          const errorData = await response.json();
          alert('Error en el depósito: ' + (errorData.message || 'Error desconocido'));
        }
      } catch (error) {
        console.error('Error al realizar el depósito:', error);
        alert('Error al realizar el depósito. Por favor, intente nuevamente.');
      }
    });
  }

  // Admin: Crear Tarjeta
  const formAdminCrearTarjeta = document.getElementById("form-admin-crear-tarjeta");
  if (formAdminCrearTarjeta) {
    formAdminCrearTarjeta.addEventListener("submit", async function(e) {
      e.preventDefault();
      const tipo = document.getElementById("admin-tipo-tarjeta").value;
      const banco = document.getElementById("admin-banco-tarjeta").value;
      const nombre = document.getElementById("admin-nombre-titular").value;
      const numero = document.getElementById("admin-numero-tarjeta").value;
      const expiracion = document.getElementById("admin-tarjeta-expiracion").value;
      const cvv = document.getElementById("admin-tarjeta-cvv").value;
      try {
        const response = await fetch(`http://localhost:3000/api/tarjetas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tipo: tipo,
            banco: banco,
            nombre: nombre,
            numero: numero,
            expiracion: expiracion,
            cvv: cvv
          })
        });
        if (response.ok) {
          alert("Tarjeta creada exitosamente");
        } else {
          const errorData = await response.json();
          alert("Error al crear tarjeta: " + (errorData.message || "Error desconocido"));
        }
      } catch (error) {
        console.error("Error al crear tarjeta:", error);
        alert("Error al crear tarjeta. Intente nuevamente.");
      }
      formAdminCrearTarjeta.reset();
    });
  }

  // Admin: Eliminar Tarjeta
  const formAdminEliminarTarjeta = document.getElementById("form-admin-eliminar-tarjeta");
  if (formAdminEliminarTarjeta) {
    formAdminEliminarTarjeta.addEventListener("submit", async function(e) {
      e.preventDefault();
      const numero = document.getElementById("admin-numero-tarjeta-eliminar").value;
      try {
        const response = await fetch(`http://localhost:3000/api/tarjetas/${numero}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert("Tarjeta eliminada exitosamente");
        } else {
          const errorData = await response.json();
          alert("Error al eliminar tarjeta: " + (errorData.message || "Error desconocido"));
        }
      } catch (error) {
        console.error("Error al eliminar tarjeta:", error);
        alert("Error al eliminar tarjeta. Intente nuevamente.");
      }
      formAdminEliminarTarjeta.reset();
    });
  }

  // Admin: Eliminar Fondos
  const formAdminEliminarFondos = document.getElementById("form-admin-eliminar-fondos");
  if (formAdminEliminarFondos) {
    formAdminEliminarFondos.addEventListener("submit", async function(e) {
      e.preventDefault();
      const cuenta = document.getElementById("admin-cuenta-eliminar").value;
      const monto = document.getElementById("admin-monto-eliminar").value;
      try {
        const response = await fetch(`http://localhost:3000/api/fondos/${cuenta}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ monto: parseFloat(monto) })
        });
        if (response.ok) {
          alert("Fondos eliminados exitosamente");
        } else {
          const errorData = await response.json();
          alert("Error al eliminar fondos: " + (errorData.message || "Error desconocido"));
        }
      } catch (error) {
        console.error("Error al eliminar fondos:", error);
        alert("Error al eliminar fondos. Intente nuevamente.");
      }
      formAdminEliminarFondos.reset();
    });
  }

  // Envío de Correos
  const formCorreos = document.getElementById("form-correos");
  if (formCorreos) {
    formCorreos.addEventListener("submit", async function(e) {
      e.preventDefault();
      const para = document.getElementById("correo-para").value;
      const asunto = document.getElementById("correo-asunto").value;
      const mensaje = document.getElementById("correo-mensaje").value;
      try {
        const response = await fetch(`http://localhost:3000/api/correos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            para: para,
            asunto: asunto,
            mensaje: mensaje
          })
        });
        if (response.ok) {
          alert("Correo enviado exitosamente");
          formCorreos.reset();
        } else {
          const errorData = await response.json();
          alert("Error al enviar correo: " + (errorData.message || "Error desconocido"));
        }
      } catch (error) {
        console.error("Error al enviar correo:", error);
        alert("Error al enviar correo. Intente nuevamente.");
      }
    });
  }

  // Evento para cerrar sesión
  document.querySelector('.logout a').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
      localStorage.removeItem('id');
      window.location.href = '../Login-Register/index.html';
    }
  });
});
