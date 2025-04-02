document.addEventListener("DOMContentLoaded", function () {
  // Referencias a las secciones
  const tarjetasSection = document.getElementById("admin-tarjetas");
  const fondosSection = document.getElementById("admin-fondos");
  const transaccionesSection = document.getElementById("admin-transacciones");
  const clientesSection = document.getElementById("admin-clientes");
  const reportesSection = document.getElementById("admin-reportes");

  // Función para ocultar todas las secciones
  function hideAllSections() {
    tarjetasSection.style.display = "none";
    fondosSection.style.display = "none";
    transaccionesSection.style.display = "none";
    clientesSection.style.display = "none";
    reportesSection.style.display = "none";
  }
  hideAllSections();
  // Mostrar por defecto la sección de Tarjetas y cargar usuarios
  tarjetasSection.style.display = "block";
  cargarUsuarios();

  // Referencias a los botones del sidebar
  const tarjetasBtn = document.getElementById("admin-tarjetas-btn");
  const fondosBtn = document.getElementById("admin-fondos-btn");
  const transaccionesBtn = document.getElementById("admin-transacciones-btn");
  const clientesBtn = document.getElementById("admin-clientes-btn");
  const reportesBtn = document.getElementById("admin-reportes-btn");

  if (tarjetasBtn) {
    tarjetasBtn.addEventListener("click", function() {
      hideAllSections();
      tarjetasSection.style.display = "block";
      cargarUsuarios();
    });
  }
  if (fondosBtn) {
    fondosBtn.addEventListener("click", function() {
      hideAllSections();
      fondosSection.style.display = "block";
      cargarFondos();
    });
  }
  if (transaccionesBtn) {
    transaccionesBtn.addEventListener("click", function() {
      hideAllSections();
      transaccionesSection.style.display = "block";
    });
  }
  if (clientesBtn) {
    clientesBtn.addEventListener("click", function() {
      hideAllSections();
      clientesSection.style.display = "block";
    });
  }
  if (reportesBtn) {
    reportesBtn.addEventListener("click", function() {
      hideAllSections();
      reportesSection.style.display = "block";
    });
  }

  // Función simulada para cargar usuarios en el panel de consulta de Tarjetas
  function cargarUsuarios() {
    const usuarios = [
      { nombre: "Juan", apellido: "Pérez" },
      { nombre: "María", apellido: "García" },
      { nombre: "Carlos", apellido: "Lopez" }
    ];
    const tbody = document.getElementById("usuarios-list");
    if (!tbody) return;
    tbody.innerHTML = "";
    usuarios.forEach(u => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${u.nombre}</td><td>${u.apellido}</td>`;
      tbody.appendChild(row);
    });
  }

  // Función simulada para cargar consulta de fondos
  function cargarFondos() {
    const fondos = [
      { cuenta: "001-12345", saldo: "$10,000" },
      { cuenta: "002-54321", saldo: "$5,500" },
      { cuenta: "003-98765", saldo: "$8,750" }
    ];
    const tbody = document.getElementById("fondos-list");
    if (!tbody) return;
    tbody.innerHTML = "";
    fondos.forEach(f => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${f.cuenta}</td><td>${f.saldo}</td>`;
      tbody.appendChild(row);
    });
  }

  // Admin: Crear Tarjeta (con panel de cédula)
  const formAdminCrearTarjeta = document.getElementById("form-admin-crear-tarjeta");
  if (formAdminCrearTarjeta) {
    formAdminCrearTarjeta.addEventListener("submit", function(e) {
      e.preventDefault();
      const tipo = document.getElementById("admin-tipo-tarjeta").value;
      const banco = document.getElementById("admin-banco-tarjeta").value;
      const nombre = document.getElementById("admin-nombre-titular").value;
      const cedula = document.getElementById("admin-cedula").value;
      const numero = document.getElementById("admin-numero-tarjeta").value;
      const expiracion = document.getElementById("admin-tarjeta-expiracion").value;
      const cvv = document.getElementById("admin-tarjeta-cvv").value;
      alert("Tarjeta creada (simulación).\n" +
            "Tipo: " + tipo + "\n" +
            "Banco: " + banco + "\n" +
            "Titular: " + nombre + "\n" +
            "Cédula: " + cedula + "\n" +
            "Número: " + numero);
      formAdminCrearTarjeta.reset();
    });
  }

  // Admin: Eliminar Tarjeta
  const formAdminEliminarTarjeta = document.getElementById("form-admin-eliminar-tarjeta");
  if (formAdminEliminarTarjeta) {
    formAdminEliminarTarjeta.addEventListener("submit", function(e) {
      e.preventDefault();
      const numeroEliminar = document.getElementById("admin-numero-tarjeta-eliminar").value;
      alert("Tarjeta eliminada (simulación).");
      formAdminEliminarTarjeta.reset();
    });
  }

  // Admin: Añadir Fondos (con panel de cédula)
  const formAdminAnadirFondos = document.getElementById("form-admin-anadir-fondos");
  if (formAdminAnadirFondos) {
    formAdminAnadirFondos.addEventListener("submit", function(e) {
      e.preventDefault();
      const cedulaFondos = document.getElementById("admin-cedula-fondos-add").value;
      const cuenta = document.getElementById("admin-cuenta-fondos").value;
      const monto = document.getElementById("admin-monto-anadir").value;
      alert("Fondos añadidos (simulación).\n" +
            "Cédula: " + cedulaFondos + "\n" +
            "Cuenta: " + cuenta + "\n" +
            "Monto: " + monto);
      formAdminAnadirFondos.reset();
    });
  }

  // Admin: Eliminar Fondos (con panel de cédula)
  const formAdminEliminarFondos = document.getElementById("form-admin-eliminar-fondos");
  if (formAdminEliminarFondos) {
    formAdminEliminarFondos.addEventListener("submit", function(e) {
      e.preventDefault();
      const cedulaFondosDel = document.getElementById("admin-cedula-fondos-del").value;
      const cuenta = document.getElementById("admin-cuenta-eliminar").value;
      const monto = document.getElementById("admin-monto-eliminar").value;
      alert("Fondos eliminados (simulación).\n" +
            "Cédula: " + cedulaFondosDel + "\n" +
            "Cuenta: " + cuenta + "\n" +
            "Monto: " + monto);
      formAdminEliminarFondos.reset();
    });
  }

  // Admin: Buscar Cliente (Gestión de Clientes)
  const formBuscarClientes = document.getElementById("form-buscar-clientes");
  if (formBuscarClientes) {
    formBuscarClientes.addEventListener("submit", function(e) {
      e.preventDefault();
      const query = document.getElementById("cliente-busqueda").value;
      alert("Búsqueda de cliente: " + query + " (simulación).");
      formBuscarClientes.reset();
      // Aquí se puede implementar la lógica para cargar resultados en el tbody#clientes-list
    });
  }

  // Monitoreo y Control: Buscar transacciones
  const formBuscarTransacciones = document.getElementById("form-buscar-transacciones");
  if (formBuscarTransacciones) {
    formBuscarTransacciones.addEventListener("submit", function(e) {
      e.preventDefault();
      const query = document.getElementById("busqueda-transacciones").value;
      alert("Búsqueda en transacciones: " + query + " (simulación).");
      formBuscarTransacciones.reset();
      // Aquí se puede implementar la lógica para filtrar la tabla de transacciones
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
