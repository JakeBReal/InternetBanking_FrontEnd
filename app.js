const API_URL = "http://localhost:3000"; // Asegúrate de que el backend esté corriendo en este puerto




import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

// Componentes
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-lg"
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}






// Registro
document.getElementById("form-registro").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const cedula = document.getElementById("cedula").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
  
    const response = await fetch(`${API_URL}/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, cedula, correo, contrasena }),
    });
  
    const data = await response.json();
    document.getElementById("registro-msg").textContent = data.mensaje || data.error;
  });
  
// Login
document.getElementById("form-login").addEventListener("submit", async (e) => {
  e.preventDefault();
  const correo = document.getElementById("correo-login").value;
  const contrasena = document.getElementById("contrasena-login").value;

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });

  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    mostrarSaldo(data.token);
  } else {
    document.getElementById("login-msg").textContent = data.error;
  }
});

// Mostrar saldo
async function mostrarSaldo(token) {
  const response = await fetch(`${API_URL}/saldo`, {
    method: "GET",
    headers: { Authorization: token },
  });

  const data = await response.json();
  if (data.saldo !== undefined) {
    document.getElementById("usuario-nombre").textContent = data.nombre || "Usuario";
    document.getElementById("usuario-saldo").textContent = `$${data.saldo.toFixed(2)}`;
    document.getElementById("login").style.display = "none";
    document.getElementById("registro").style.display = "none";
    document.getElementById("saldo").style.display = "block";
  } else {
    alert("Error al obtener el saldo");
  }
}

// Cerrar sesión
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  location.reload();
});
