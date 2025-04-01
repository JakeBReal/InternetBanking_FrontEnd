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
  // Mostrar por defecto la sección de Tarjetas
  tarjetasSection.style.display = "block";

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
    });
  }
  if (fondosBtn) {
    fondosBtn.addEventListener("click", function() {
      hideAllSections();
      fondosSection.style.display = "block";
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

  // Admin: Crear Tarjeta
  const formAdminCrearTarjeta = document.getElementById("form-admin-crear-tarjeta");
  if (formAdminCrearTarjeta) {
    formAdminCrearTarjeta.addEventListener("submit", function(e) {
      e.preventDefault();
      const tipo = document.getElementById("admin-tipo-tarjeta").value;
      const banco = document.getElementById("admin-banco-tarjeta").value;
      const nombre = document.getElementById("admin-nombre-titular").value;
      const numero = document.getElementById("admin-numero-tarjeta").value;
      const expiracion = document.getElementById("admin-tarjeta-expiracion").value;
      const cvv = document.getElementById("admin-tarjeta-cvv").value;
      alert("Tarjeta creada (simulación).");
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
      const cuenta = document.getElementById("admin-cuenta-fondos").value;
      const monto = document.getElementById("admin-monto-anadir").value;
      alert("Fondos añadidos (simulación).");
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
      alert("Fondos eliminados (simulación).");
      formAdminEliminarFondos.reset();
    });
  }

  // Admin: Buscar Cliente (Consulta)
  const formBuscarClientes = document.getElementById("form-buscar-clientes");
  if (formBuscarClientes) {
    formBuscarClientes.addEventListener("submit", function(e) {
      e.preventDefault();
      const query = document.getElementById("cliente-busqueda").value;
      alert("Búsqueda de cliente: " + query + " (simulación).");
      formBuscarClientes.reset();
      // Aquí se podría implementar la lógica para cargar los resultados en el tbody#clientes-list
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
