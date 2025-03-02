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

    // Evento para el botón Serrucho
    document.getElementById("serrucho-btn").addEventListener("click", () => {
        ocultarSecciones();
        serrucho.style.display = "block";
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

        // Asegurar que exista la tabla antes de agregar una fila
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
});
