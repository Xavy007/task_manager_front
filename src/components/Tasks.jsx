import { useEffect, useState } from "react";
import axios from "axios";

export default function Tasks(){
    const [tasks , setTasks]= useState([]);
    const [loading, setLoading]=useState(true);
    useEffect(() => {
        axios.get("http://localhost:3050/api/taskwithusers") 
          .then((response) => {
            console.log(response.data)
            setTasks(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error al obtener los datos:", error);
            setLoading(false);
          });
      }, [])
      return (
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Lista de Tareas</h2>
    
          {loading ? (
            <p className="text-center text-gray-600">Cargando datos...</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 shadow-lg table-fixed md:table-fixed">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-3 border">Titulo</th>
                  
                  <th className="p-3 border">Descripcion</th>
                  <th className="p-3 border">Estado</th>
                  <th className="p-3 border">Fecha</th>
                  <th className="p-3 border">Usuario</th>
                  <th className="p-3 border">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="text-center bg-gray-100 hover:bg-gray-200">
                    <td className="p-3 border">{task.title}</td>
                    <td className="p-3 border">{task.description}</td>
                    <td className="p-3 border">{task.estate}</td>
                    <td className="p-3 border">{task.deadline}</td>
                    <td className="p-3 border">{task.User.name}</td>
                    <td className="p-3 border">
                      <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
    }