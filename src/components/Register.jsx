import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate= useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3050/api/user", formData);
      console.log("Usuario registrado:", response.data);
      navigate("/");
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Hubo un error al registrar el usuario");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-700">Registrar una Cuenta</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600">Nombre Completo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Juan Pérez"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="grid xl:grid-cols-2 gap-2 md:grid-cols-1">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Registrarse
            </button>
            <Link to="/" className="text-blue-500 hover:text-blue-700">
              <button className="w-full p-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600">
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
