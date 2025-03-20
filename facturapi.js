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
const clienteEjemplo = {
  legal_name: "Empresa Ejemplo S.A.",
  tax_id: "XAXX010101000",
  email: "empresa@ejemplo.com",
};

// Obtener todos los clientes
function getAllCustomers() {
  facturapi.get("/")
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
function createCustomer() {
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
// getCustomerById("ID_DEL_CLIENTE_AQUI");
// createCustomer();
// updateCustomer("ID_DEL_CLIENTE_AQUI", { legal_name: "Nuevo Nombre S.A." });
// deleteCustomer("ID_DEL_CLIENTE_AQUI");
