document.addEventListener("DOMContentLoaded", function () {
  // Secciones
  const tarjetasSection = document.getElementById("admin-tarjetas");
  const eliminarTarjetaSection = document.getElementById("admin-eliminar-tarjeta");
  const fondosSection = document.getElementById("admin-fondos");
  const eliminarFondosSection = document.getElementById("admin-eliminar-fondos");
  const transaccionesSection = document.getElementById("admin-transacciones");
  const clientesSection = document.getElementById("admin-clientes");
  const reportesSection = document.getElementById("admin-reportes");

  // Función para ocultar todas las secciones
  function hideAllSections() {
    tarjetasSection.style.display = "none";
    if (eliminarTarjetaSection) eliminarTarjetaSection.style.display = "none";
    fondosSection.style.display = "none";
    if (eliminarFondosSection) eliminarFondosSection.style.display = "none";
    transaccionesSection.style.display = "none";
    clientesSection.style.display = "none";
    reportesSection.style.display = "none";
  }
  hideAllSections();
  // Mostrar por defecto la sección de Crear Tarjeta y cargar usuarios
  tarjetasSection.style.display = "block";
  cargarUsuarios();
  cargarTarjetasEliminar();
  cargarFondos();
  cargarFondosEliminar();

  // Botones del sidebar
  const tarjetasBtn = document.getElementById("admin-tarjetas-btn");
  const eliminarTarjetaBtn = document.getElementById("admin-eliminar-tarjeta-btn");
  const fondosBtn = document.getElementById("admin-fondos-btn");
  const eliminarFondosBtn = document.getElementById("admin-eliminar-fondos-btn");
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
  if (eliminarTarjetaBtn) {
    eliminarTarjetaBtn.addEventListener("click", function() {
      hideAllSections();
      eliminarTarjetaSection.style.display = "block";
      cargarTarjetasEliminar();
    });
  }
  if (fondosBtn) {
    fondosBtn.addEventListener("click", function() {
      hideAllSections();
      fondosSection.style.display = "block";
      cargarFondos();
    });
  }
  if (eliminarFondosBtn) {
    eliminarFondosBtn.addEventListener("click", function() {
      hideAllSections();
      eliminarFondosSection.style.display = "block";
      cargarFondosEliminar();
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
      { nombre: "Juan", apellido: "Pérez", cedula: "12345678" },
      { nombre: "María", apellido: "García", cedula: "87654321" },
      { nombre: "Carlos", apellido: "Lopez", cedula: "11223344" }
    ];
    const tbody = document.getElementById("usuarios-list");
    if (!tbody) return;
    tbody.innerHTML = "";
    usuarios.forEach(u => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${u.nombre}</td><td>${u.apellido}</td><td>${u.cedula}</td>`;
      // Al hacer clic, se pasan los datos al formulario de creación
      row.addEventListener("click", function() {
        document.getElementById("admin-nombre-titular").value = u.nombre;
        document.getElementById("admin-apellido-titular").value = u.apellido;
        document.getElementById("admin-cedula").value = u.cedula;
      });
      tbody.appendChild(row);
    });
  }

  // Función simulada para cargar consulta de tarjetas para eliminación
  function cargarTarjetasEliminar() {
    const tarjetas = [
      { numero: "1111-2222-3333-4444", banco: "Banco A", titular: "Juan Pérez" },
      { numero: "5555-6666-7777-8888", banco: "Banco B", titular: "María García" }
    ];
    const tbody = document.getElementById("tarjetas-eliminar-list");
    if (!tbody) return;
    tbody.innerHTML = "";
    tarjetas.forEach(t => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${t.numero}</td><td>${t.banco}</td><td>${t.titular}</td>`;
      // Al hacer clic, se pasa el número al formulario de eliminación
      row.addEventListener("click", function() {
        document.getElementById("admin-numero-tarjeta-eliminar").value = t.numero;
      });
      tbody.appendChild(row);
    });
  }

  // Función simulada para cargar consulta de fondos para gestión
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

  // Función simulada para cargar consulta de fondos para eliminación
  function cargarFondosEliminar() {
    const fondos = [
      { cuenta: "001-12345", saldo: "$10,000" },
      { cuenta: "002-54321", saldo: "$5,500" },
      { cuenta: "003-98765", saldo: "$8,750" }
    ];
    const tbody = document.getElementById("fondos-eliminar-list");
    if (!tbody) return;
    tbody.innerHTML = "";
    fondos.forEach(f => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${f.cuenta}</td><td>${f.saldo}</td>`;
      // Al hacer clic, se pasa el número de cuenta al formulario de eliminación
      row.addEventListener("click", function() {
        document.getElementById("admin-cuenta-eliminar").value = f.cuenta;
      });
      tbody.appendChild(row);
    });
  }

  // Admin: Crear Tarjeta
  const formAdminCrearTarjeta = document.getElementById("form-admin-crear-tarjeta");
  if (formAdminCrearTarjeta) {
    formAdminCrearTarjeta.addEventListener("submit", function(e) {
      e.preventDefault();
      const tipo = document.getElementById("admin-tipo-tarjeta").value;
      const banco = document.getElementById("admin-banco-tarjeta").value;
      const nombre = document.getElementById("admin-nombre-titular").value;
      const apellido = document.getElementById("admin-apellido-titular").value;
      const cedula = document.getElementById("admin-cedula").value;
      const numero = document.getElementById("admin-numero-tarjeta").value;
      const expiracion = document.getElementById("admin-tarjeta-expiracion").value;
      const cvv = document.getElementById("admin-tarjeta-cvv").value;
      alert("Tarjeta creada (simulación).\n" +
            "Tipo: " + tipo + "\n" +
            "Banco: " + banco + "\n" +
            "Titular: " + nombre + " " + apellido + "\n" +
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

  // Admin: Añadir Fondos
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

  // Admin: Eliminar Fondos
  const formAdminEliminarFondos = document.getElementById("form-admin-eliminar-fondos");
  if (formAdminEliminarFondos) {
    formAdminEliminarFondos.addEventListener("submit", function(e) {
      e.preventDefault();
      const cuenta = document.getElementById("admin-cuenta-eliminar").value;
      const monto = document.getElementById("admin-monto-eliminar").value;
      alert("Fondos eliminados (simulación).\n" +
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
