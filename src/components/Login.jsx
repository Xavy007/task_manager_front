import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useAuth } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[message, setMessage]= useState("");
  const[isError,setIsError]= useState(false);
  const navigate= useNavigate();
  const {login}=useAuth;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response= await axios.post("http://localhost:3050/auth/login",
            {
                email,password
            });
      
      /*localStorage.setItem("token", response.data.token); // Guardar token en localStorage*/
      setMessage("Inicio de sesión exitoso ✅");
      setIsError(false);
      login(response.data.token);
      navigate('/dashboard');

    } catch (error) {
       /* console.log(error);
        setMessage("❌ Error: " + error.response.data.message);
        setIsError(true);*/
        setIsError("Credenciales incorrectas");

    }
  };
const Registro=()=>{
    
}
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700 ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Ingreso al sistema de Tareas</h1>
        <h2 className="text-2xl font-semibold text-center text-gray-700">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Correo Electrónico</label>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>

            <input
              type="email"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
            Iniciar sesión
          </button>
         </form>
        <div className="text-center">
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
        {message && (
            <div className={`mt-4 p-3 text-center font-medium rounded-md ${isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                {message}
            </div>
            )}
      </div>
    </div>
  );
}
