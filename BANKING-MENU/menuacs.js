document.addEventListener("DOMContentLoaded", function () {
    const bienvenida = document.getElementById("bienvenida");
    const inicio = document.getElementById("inicio");
    const transferencias = document.getElementById("transacciones");
    const tarjetas = document.getElementById("tarjetas");
    const impuestos = document.getElementById("impuestos"); // Asegurar que exista este ID en el HTML

    // Ocultar todas las secciones por defecto excepto bienvenida
    inicio.style.display = "none";
    transferencias.style.display = "none";
    tarjetas.style.display = "none";
    impuestos.style.display = "none"; 

    function ocultarSecciones() {
        bienvenida.style.display = "none";
        inicio.style.display = "none";
        transferencias.style.display = "none";
        tarjetas.style.display = "none";
        impuestos.style.display = "none";
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
});

