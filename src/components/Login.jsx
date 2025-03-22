import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios'
import { AuthProvider, useAuth } from "./AuthContext";
import { AuthContext } from "./AuthContext";
const apiUrl=import.meta.env.VITE_API_URL

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[message, setMessage]= useState("");
  const[isError,setIsError]= useState(false);
  let navigate= useNavigate();
  const{user,login}=useAuth();   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
            const response= await axios.post(apiUrl+"/auth/login",
            {
                email,password
            }, { withCredentials: true });
      
      console.log(response.data)      
      login(response.data.token);
      setMessage("Inicio de sesión exitoso ✅");
      setIsError(false);
      navigate('/dashboard');

    } catch (error) {
       console.log(error);
        setMessage("❌ Error: " + error.response.data.message);
        setIsError(true);
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
