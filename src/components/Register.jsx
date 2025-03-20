import { Link } from "react-router-dom";

export default function Register() {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-700">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-xl">
          <h2 className="text-2xl font-bold text-center text-gray-700">Registrar una Cuenta</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Nombre Completo</label>
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                placeholder="Juan Pérez"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Correo Electrónico</label>
              <input
                type="email"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Contraseña</label>
              <input
                type="password"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="grid xl:grid-cols-2 gap-2 md:grid-cols-1 " >
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 grid "
            >
              Registrarse
            </button>
            
            <Link to="/" className="text-blue-500 hover:text-blue-700">
                <button className="w-full p-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 ">Cancelar</button>  
          </Link>
          </div>
            
          </form>
        </div>
      </div>
    );
  }
  