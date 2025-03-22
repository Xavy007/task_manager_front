import { useState } from "react";
const apiUrl=import.meta.env.VITE_API_URL
import axios from 'axios'

export default function User_Form() {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    clave: "",
    confirmClave: "",
  });
  const [error, setError] = useState("");
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    if (formData.clave !== formData.confirmClave) {
      setError("Las claves no coinciden");
      return;
    }
    setError("");
    let us={
        name:formData.nombre,
        email:formData.email,
        password:formData.clave
    }
    try {
        const response= await axios.post(apiUrl+"/api/user",us);
        window.location.reload();

    } catch (error) {
       console.log(error);
        setMessage("❌ Error: " + error.response.data.message);
        setIsError(true);
        setIsError("Credenciales incorrectas");

    }
    
  
  };
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Formulario</h2>
        
        {/* Contenedor de los campos en formato horizontal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  
          {/* Campo Nombre */}
          <div className="flex items-center space-x-4">
            <label
              htmlFor="nombre"
              className="text-gray-700 font-medium"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ingrese su nombre"
            />
          </div>
  
          {/* Campo Email */}
          <div className="flex items-center space-x-4">
            <label
              htmlFor="email"
              className="text-gray-700 font-medium"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ingrese su correo electrónico"
            />
          </div>
  
          {/* Campo Clave */}
          <div className="flex items-center space-x-4">
            <label
              htmlFor="clave"
              className="text-gray-700 font-medium"
            >
              Clave:
            </label>
            <input
              type="password"
              id="clave"
              name="clave"
              value={formData.clave}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ingrese su clave"
            />
          </div>
  
          {/* Campo Confirmar Clave */}
          <div className="flex items-center space-x-4">
            <label
              htmlFor="confirmClave"
              className="text-gray-700 font-medium"
            >
              Confirmar Clave:
            </label>
            <input
              type="password"
              id="confirmClave"
              name="confirmClave"
              value={formData.confirmClave}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirme su clave"
            />
          </div>
        </div>
  
        {/* Mostrar el error si las claves no coinciden */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
  
        {/* Botón de Enviar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}