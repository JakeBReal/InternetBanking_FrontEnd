document.getElementById('depositar').addEventListener('click', function() {
    const cantidad = parseFloat(document.getElementById('cantidadDeposito').value);

    if (isNaN(cantidad) || cantidad <= 0) {
        alert('Por favor, ingresa una cantidad válida para depositar.');
        return;
    }

    fetch('/api/depositar', { // Reemplaza con la URL de tu API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') // Si usas tokens de autenticación
        },
        body: JSON.stringify({ cantidad: cantidad })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Depósito exitoso. Nuevo saldo: ' + data.saldo);
            document.getElementById('cantidadDeposito').value = '';
            // Actualizar el saldo en la interfaz de usuario
        } else {
            alert('Error en el depósito: ' + data.message);
        }
    });
});