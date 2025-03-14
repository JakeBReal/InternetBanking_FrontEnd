document.addEventListener("DOMContentLoaded", function () {
    const bienvenida = document.getElementById("bienvenida");
    const inicio = document.getElementById("inicio");
    const transferencias = document.getElementById("transacciones");
    const tarjetas = document.getElementById("tarjetas");
    const impuestos = document.getElementById("impuestos");
    const cheques = document.getElementById("cheques");
    const serrucho = document.getElementById("serrucho"); // Nueva sección para Serrucho

    // Ocultar todas las secciones por defecto excepto bienvenida
    inicio.style.display = "none";
    transferencias.style.display = "none";
    tarjetas.style.display = "none";
    impuestos.style.display = "none"; 
    cheques.style.display = "none";
    serrucho.style.display = "none";

    function ocultarSecciones() {
        bienvenida.style.display = "none";
        inicio.style.display = "none";
        transferencias.style.display = "none";
        tarjetas.style.display = "none";
        impuestos.style.display = "none";
        cheques.style.display = "none";
        serrucho.style.display = "none";
    }

    // Función para obtener y mostrar los saldos de las cuentas
    async function actualizarSaldos() {
        try {
            const response = await fetch('http://localhost:3000/api/cuentas');
            const cuentas = await response.json();
            
            // Inicializar los saldos
            let saldoCorriente = "0";
            let saldoAhorro = "0";

            // Procesar cada cuenta del array
            cuentas.forEach(cuenta => {
                if (cuenta.tipo_cuenta === "1") {
                    saldoCorriente = cuenta.monto;
                } else if (cuenta.tipo_cuenta === "2") {
                    saldoAhorro = cuenta.monto;
                }
            });
            
            // Actualizar los saldos en el HTML
            const saldosCorriente = document.querySelectorAll('.account-box .balance');
            saldosCorriente[0].textContent = `$${saldoCorriente}`;
            saldosCorriente[1].textContent = `$${saldoAhorro}`;
        } catch (error) {
            console.error('Error al obtener los saldos:', error);
        }
    }

    // Actualizar saldos cuando se carga la página
    actualizarSaldos();

    document.getElementById("inicio-btn").addEventListener("click", () => {
        ocultarSecciones();
        inicio.style.display = "block";
        actualizarSaldos(); // Actualizar saldos cuando se muestra la sección
    });

    // Función para cargar el historial de transacciones
    async function cargarTransacciones() {
        try {
            const response = await fetch('http://localhost:3000/api/transacciones');
            const transacciones = await response.json();
            
            const transactionsList = document.getElementById("transactions-list");
            // Limpiar la tabla antes de agregar nuevas transacciones
            transactionsList.innerHTML = '';
            
            // Ordenar las transacciones por fecha (más recientes primero)
            transacciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

            transacciones.forEach(transaccion => {
                const fecha = new Date(transaccion.fecha).toLocaleDateString();
                const newTransfer = document.createElement("tr");
                newTransfer.innerHTML = `
                    <td>${fecha}</td>
                    <td>${transaccion.cuenta_origen}</td>
                    <td>${transaccion.cuenta_destino}</td>
                    <td>$${transaccion.monto}</td>
                    <td>${transaccion.concepto}</td>
                `;
                transactionsList.appendChild(newTransfer);
            });
        } catch (error) {
            console.error('Error al cargar las transacciones:', error);
        }
    }

    document.getElementById("transacciones-btn").addEventListener("click", () => {
        ocultarSecciones();
        transferencias.style.display = "block";
        cargarTransacciones(); // Cargar transacciones cuando se muestra la sección
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

    // Evento para el botón Serrucho
    document.getElementById("serrucho-btn").addEventListener("click", () => {
        ocultarSecciones();
        serrucho.style.display = "block";
    });

    // Manejo del formulario de transferencias
    const formTransferencias = document.getElementById("form-transacciones");

    formTransferencias.addEventListener("submit", async function (e) {
        e.preventDefault();

        const origen = document.getElementById("origen").value;
        const destino = document.getElementById("destino").value;
        const monto = document.getElementById("monto").value;
        const concepto = document.getElementById("concepto").value;

        try {
            const response = await fetch('http://localhost:3000/api/cuentas/transaccion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cuenta_origen: origen,
                    cuenta_destino: destino,
                    monto: parseFloat(monto),
                    concepto: concepto
                })
            });

            if (response.ok) {
                alert('Transacción realizada con éxito');
                
                // Ocultar todas las secciones y mostrar la sección de estado
                ocultarSecciones();
                inicio.style.display = "block";
                
                // Actualizar los saldos después de la transacción
                await actualizarSaldos();
                
                // Recargar la lista de transacciones en segundo plano
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

    // Manejo del formulario de cheques, similar al de transferencias
    const formCheques = document.getElementById("form-cheques");

    formCheques.addEventListener("submit", function (e) {
        e.preventDefault();

        const cuentaOrigen = document.getElementById("cuenta-origen").value;
        const numeroCheque = document.getElementById("numero-cheque").value;
        const montoCheque = document.getElementById("monto-cheque").value;
        const conceptoCheque = document.getElementById("concepto-cheque").value;

        const fecha = new Date().toLocaleDateString();

        // Asegurar que exista la tabla de cheques antes de agregar una fila
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

    // Manejo del formulario de serrucho, adaptado al mantenimiento
    const formSerrucho = document.getElementById("form-serrucho");

    formSerrucho.addEventListener("submit", function (e) {
        e.preventDefault();

        const tipoSerrucho = document.getElementById("tipo-serrucho").value;
        const marcaSerrucho = document.getElementById("marca-serrucho").value;
        const cantidadSerrucho = document.getElementById("cantidad-serrucho").value;
        const descripcionSerrucho = document.getElementById("descripcion-serrucho").value;

        const fecha = new Date().toLocaleDateString();

        // Asegurar que exista la tabla de serrucho antes de agregar una fila
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

    // Función para cargar el historial de servicios pagados
    async function cargarHistorialServicios() {
        try {
            const response = await fetch('http://localhost:3000/api/servicios');
            const servicios = await response.json();
            
            const serviciosList = document.getElementById("impuestos-list");
            // Limpiar la tabla antes de agregar nuevos servicios
            serviciosList.innerHTML = '';
            
            // Ordenar los servicios por fecha (más recientes primero)
            servicios.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

            servicios.forEach(servicio => {
                const fecha = new Date(servicio.fecha).toLocaleDateString();
                const newServicio = document.createElement("tr");
                newServicio.innerHTML = `
                    <td>${servicio.tipo_de_impuesto}</td>
                    <td>${servicio.numero_referencia}</td>
                    <td>$${servicio.monto}</td>
                    <td>${servicio.cuenta_pago}</td>
                    <td>${fecha}</td>
                `;
                serviciosList.appendChild(newServicio);
            });
        } catch (error) {
            console.error('Error al cargar el historial de servicios:', error);
        }
    }

    // Manejo del formulario de impuestos
    const formImpuestos = document.getElementById("form-impuestos");
    formImpuestos.addEventListener("submit", async function (e) {
        e.preventDefault();

        const tipoImpuesto = document.getElementById("tipo-impuesto").value;
        const numeroReferencia = document.getElementById("numero-referencia").value;
        const montoImpuesto = document.getElementById("monto-impuesto").value;
        const cuentaPago = document.getElementById("cuenta-pago").value;

        try {
            const response = await fetch('http://localhost:3000/api/servicios', {
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
});

document.addEventListener("DOMContentLoaded", function () {
    const bienvenida = document.getElementById("bienvenida");
    const inicio = document.getElementById("inicio");
    const transferencias = document.getElementById("transacciones");
    const tarjetas = document.getElementById("tarjetas");
    const impuestos = document.getElementById("impuestos");
    const cheques = document.getElementById("cheques");
    const serrucho = document.getElementById("serrucho");
    const deposito = document.getElementById("deposito"); // Nueva sección

    // Ocultar todas las secciones
    function ocultarSecciones() {
        bienvenida.style.display = "none";
        inicio.style.display = "none";
        transferencias.style.display = "none";
        tarjetas.style.display = "none";
        impuestos.style.display = "none";
        cheques.style.display = "none";
        serrucho.style.display = "none";
        deposito.style.display = "none";
    }

    // Listeners para cada botón de la barra lateral
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

    // Nuevo listener para Depósito
    document.getElementById("deposito-btn").addEventListener("click", () => {
        ocultarSecciones();
        deposito.style.display = "block";
    });

    // Manejo del formulario de depósito
    const formDeposito = document.getElementById("form-deposito");
    formDeposito.addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtenemos los valores del formulario
        const cuentaDeposito = document.getElementById("cuenta-deposito").value;
        const montoDeposito = document.getElementById("monto-deposito").value;
        const referenciaDeposito = document.getElementById("referencia-deposito").value;
        const conceptoDeposito = document.getElementById("concepto-deposito").value;

        // Generamos la fecha actual
        const fecha = new Date().toLocaleDateString();

        // Aseguramos que exista la tabla antes de agregar una fila
        let depositoList = document.getElementById("deposito-list");
        // Creamos la fila
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${fecha}</td>
            <td>${cuentaDeposito}</td>
            <td>${montoDeposito}</td>
            <td>${referenciaDeposito}</td>
            <td>${conceptoDeposito}</td>
        `;

        // Agregamos la fila al tbody
        depositoList.appendChild(newRow);

        // Reseteamos el formulario
        formDeposito.reset();
    });
});

