require("dotenv").config();
const axios = require("axios");

// Cargar variables de entorno
const FACTURAPI_KEY = process.env.FACTURAPI_KEY;
const API_URL = process.env.API_URL;

// Configuración de Axios con autenticación
const facturapi = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${FACTURAPI_KEY}`,
    "Content-Type": "application/json",
  },
});

// Datos de ejemplo para un cliente
const clienteN = {
  "legal_name": "John Doe",
  "tax_id": "XAXX010101000",
  "tax_system": "616",
  "email": "john@example.com",
  "address": {
    "zip": "83240"
  }
}

const clienteU = {
  "tax_id": "XAXX010101000",
  "tax_system": "616",
  "legal_name": "JOHN DOE PRUEBA",
  "email": "john@example.com",
  "address": {
    "city": "Hermosillo",
    "municipality": "Hermosillo",
    "state": "Sonora",
    "country": "MEX",
    "zip": "83240"
  },
  "default_invoice_use": "G03",
}


// Obtener todos los clientes
function getAllCustomers() {
  facturapi.get("")
    .then(response => console.log(response.data))
    .catch(error => console.error("Error al obtener clientes:", error.response?.data || error.message));
}

// Obtener un cliente por ID
function getCustomerById(customerId) {
  facturapi.get(`/${customerId}`)
    .then(response => console.log(response.data))
    .catch(error => console.error("Error al obtener cliente:", error.response?.data || error.message));
}

// Crear un nuevo cliente
function createCustomer(clienteEjemplo) {
  facturapi.post("/", clienteEjemplo)
    .then(response => console.log("Cliente creado:", response.data))
    .catch(error => console.error("Error al crear cliente:", error.response?.data || error.message));
}

// Actualizar un cliente
function updateCustomer(customerId, updatedData) {
  facturapi.put(`/${customerId}`, updatedData)
    .then(response => console.log("Cliente actualizado:", response.data))
    .catch(error => console.error("Error al actualizar cliente:", error.response?.data || error.message));
}

// Eliminar un cliente
function deleteCustomer(customerId) {
  facturapi.delete(`/${customerId}`)
    .then(() => console.log("Cliente eliminado con éxito"))
    .catch(error => console.error("Error al eliminar cliente:", error.response?.data || error.message));
}

// === Ejemplo de uso ===
getAllCustomers();
// getCustomerById("67dc3d5605fe87f1c99cb8fb");
// createCustomer(clienteN);
// updateCustomer("67dc536ec3e708c2f4a70335", clienteU);
// deleteCustomer("67dc3d5605fe87f1c99cb8fb");
