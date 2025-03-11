document.addEventListener("DOMContentLoaded", function () {
    // Obtener secciones y elementos
    const bienvenida = document.getElementById("bienvenida");
    const inicio = document.getElementById("inicio");
    const transferencias = document.getElementById("transacciones");
    const tarjetas = document.getElementById("tarjetas");
    const mantenimientoTarjeta = document.getElementById("mantenimiento-tarjeta");
    const impuestos = document.getElementById("impuestos");
    const cheques = document.getElementById("cheques");
    const serrucho = document.getElementById("serrucho");
    const deposito = document.getElementById("deposito");
    const beneficiario = document.getElementById("beneficiario");
    const logoutModal = document.getElementById("logout-modal");
  
    // Función para ocultar todas las secciones
    function ocultarSecciones() {
      bienvenida.style.display = "none";
      inicio.style.display = "none";
      transferencias.style.display = "none";
      tarjetas.style.display = "none";
      mantenimientoTarjeta.style.display = "none";
      impuestos.style.display = "none";
      cheques.style.display = "none";
      serrucho.style.display = "none";
      deposito.style.display = "none";
      beneficiario.style.display = "none";
    }
  
    // Al cargar la página, ocultamos todas las secciones y mostramos solo la bienvenida
    ocultarSecciones();
    bienvenida.style.display = "block";
  
    // Eventos para la barra lateral
    document.getElementById("inicio-btn").addEventListener("click", () => {
      ocultarSecciones();
      inicio.style.display = "block";
    });
  
    document.getElementById("transacciones-btn").addEventListener("click", () => {
      ocultarSecciones();
      transferencias.style.display = "block";
    });
  
    document.getElementById("tarjetas-btn").addEventListener("click", () => {
      ocultarSecciones();
      tarjetas.style.display = "block";
    });
  
    document.getElementById("impuestos-btn").addEventListener("click", () => {
      ocultarSecciones();
      impuestos.style.display = "block";
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
    });
  
    document.getElementById("beneficiario-btn").addEventListener("click", () => {
      ocultarSecciones();
      beneficiario.style.display = "block";
    });
  
    // Evento para el botón "Agregar nueva tarjeta"
    const agregarTarjeta = document.querySelector('.tarjeta.agregar');
    agregarTarjeta.addEventListener("click", () => {
      ocultarSecciones();
      mantenimientoTarjeta.style.display = "block";
    });
  
    // Manejo del formulario de mantenimiento de tarjeta
    document.getElementById("form-tarjeta").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const tipoTarjeta = document.getElementById("tipo-tarjeta").value;
      const bancoTarjeta = document.getElementById("banco-tarjeta").value;
      const nombreTarjeta = document.getElementById("nombre-tarjeta").value;
      const numeroTarjeta = document.getElementById("numero-tarjeta").value;
  
      // Crear un nuevo elemento de tarjeta
      const nuevaTarjeta = document.createElement("div");
      nuevaTarjeta.classList.add("tarjeta");
      nuevaTarjeta.innerHTML = `
        <div class="detalles">
          <span class="tipo">${tipoTarjeta.charAt(0).toUpperCase() + tipoTarjeta.slice(1)}</span>
          <span class="banco">${bancoTarjeta}</span>
          <p>${nombreTarjeta}</p>
          <p>**** ${numeroTarjeta.slice(-4)}</p>
        </div>
      `;
  
      // Insertar la nueva tarjeta en el contenedor, antes del botón "agregar"
      const tarjetasContainer = document.querySelector("#tarjetas .tarjetas");
      tarjetasContainer.insertBefore(nuevaTarjeta, agregarTarjeta);
  
      ocultarSecciones();
      tarjetas.style.display = "block";
  
      // Resetea el formulario
      e.target.reset();
    });
  
    // Botón cancelar en mantenimiento de tarjeta
    document.getElementById("cancelar-tarjeta").addEventListener("click", function () {
      ocultarSecciones();
      tarjetas.style.display = "block";
    });
  
    // Manejo del formulario de transferencias
    const formTransferencias = document.getElementById("form-transacciones");
    formTransferencias.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const origen = document.getElementById("origen").value;
      const destino = document.getElementById("destino").value;
      const monto = document.getElementById("monto").value;
      const concepto = document.getElementById("concepto").value;
      const fecha = new Date().toLocaleDateString();
  
      let transactionsList = document.getElementById("transactions-list");
      if (!transactionsList) {
        transactionsList = document.createElement("tbody");
        transactionsList.id = "transactions-list";
  
        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Monto</th>
              <th>Concepto</th>
            </tr>
          </thead>
        `;
        table.appendChild(transactionsList);
        transferencias.appendChild(table);
      }
  
      const newTransfer = document.createElement("tr");
      newTransfer.innerHTML = `
        <td>${fecha}</td>
        <td>${origen}</td>
        <td>${destino}</td>
        <td>${monto}</td>
        <td>${concepto}</td>
      `;
      transactionsList.appendChild(newTransfer);
      formTransferencias.reset();
    });
  
    // Manejo del formulario de cheques
    const formCheques = document.getElementById("form-cheques");
    formCheques.addEventListener("submit", function (e) {
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
  
    // Manejo del formulario de serrucho
    const formSerrucho = document.getElementById("form-serrucho");
    formSerrucho.addEventListener("submit", function (e) {
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
  
    // Manejo del formulario de depósito
    const formDeposito = document.getElementById("form-deposito");
    formDeposito.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const cuentaDeposito = document.getElementById("cuenta-deposito").value;
      const montoDeposito = document.getElementById("monto-deposito").value;
      const referenciaDeposito = document.getElementById("referencia-deposito").value;
      const conceptoDeposito = document.getElementById("concepto-deposito").value;
      const fecha = new Date().toLocaleDateString();
  
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${fecha}</td>
        <td>${cuentaDeposito}</td>
        <td>${montoDeposito}</td>
        <td>${referenciaDeposito}</td>
        <td>${conceptoDeposito}</td>
      `;
      const depositoList = document.getElementById("deposito-list");
      depositoList.appendChild(newRow);
      formDeposito.reset();
    });
  
    // Manejo del formulario de Beneficiario
    const formBeneficiario = document.getElementById("form-beneficiario");
    formBeneficiario.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const nombre = document.getElementById("nombre-beneficiario").value;
      const cuenta = document.getElementById("cuenta-beneficiario").value;
      const relacion = document.getElementById("relacion-beneficiario").value;
  
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${nombre}</td>
        <td>${cuenta}</td>
        <td>${relacion}</td>
      `;
      const beneficiarioList = document.getElementById("beneficiario-list");
      beneficiarioList.appendChild(newRow);
      formBeneficiario.reset();
    });
  
    // Modal de Confirmación de Cierre de Sesión
    document.getElementById("logout-btn").addEventListener("click", function (e) {
      e.preventDefault();
      // Aseguramos que se muestre como flex para centrarlo
      logoutModal.style.display = "flex";
    });
  
    document.getElementById("cancel-logout").addEventListener("click", function () {
      logoutModal.style.display = "none";
    });
  
    document.getElementById("confirm-logout").addEventListener("click", function () {
      logoutModal.style.display = "none";
      alert("Sesión cerrada");
    });
  });
  