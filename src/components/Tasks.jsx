import Navbar from "./Navbar";import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const apiUrl = "http://localhost:3050/api/tasks";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    estate: "pendiente",
  });
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3050/api/taskwithusers");
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await axios.put(`${apiUrl}/${editingTask._id}`, formData);
      } else {
        await axios.post(apiUrl, { ...formData, estate: "pendiente" });
      }
      setFormData({ title: "", description: "", deadline: "", estate: "pendiente" });
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error al enviar la tarea:", error);
    }
  };

  const handleEdit = (id,task) => {
    setEditingTask(task);
    setFormData({
      id:id,
      title: task.title,
      description: task.description,
      deadline: new Date(task.deadline).toISOString().split("T")[0], // Formato YYYY-MM-DD
      estate: task.estate,
    });
  };

  const handleDelete = async (id, estate) => {
    console.log(id)
    if (estate === "terminado") return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };
  
  const columns = [
    
    { name: "Título", selector: (row) => row.title, sortable: true },
    { name: "Descripción", selector: (row) => row.description, sortable: true },
    { name: "Fecha Límite", selector: (row) => new Date(row.deadline).toISOString().split("T")[0], sortable: true },
    { name: "Estado", selector: (row) => row.estate, sortable: true },
    

    {
      name: "Acciones",
      cell: (row) => (
        <div>
          {row.estate !== "terminado" && (
          <><button onClick={() => handleEdit(row.id,row)} className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2">
              ✏️ Editar
            </button><button onClick={() => handleDelete(row.id, row.estate)} className="bg-red-500 text-white px-3 py-1 rounded-md">
                ❌ Eliminar
              </button></>
          )}
        </div>
      ),
    },
  ];

  return (
    <><Navbar /><div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {editingTask ? "Editar Tarea" : "Añadir Nueva Tarea"}
      </h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <label className="w-32">Título:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex items-center">
            <label className="w-32">Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex items-center">
            <label className="w-32">Fecha Límite:</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          {editingTask && (
            <div className="flex items-center">
              <label className="w-32">Estado:</label>
              <select
                name="estate"
                value={formData.estate}
                onChange={handleChange}
                required
                disabled={editingTask.estate === "terminado"}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="pendiente">Pendiente</option>
                <option value="terminado">Terminado</option>
              </select>
            </div>
          )}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md mt-4">
          {editingTask ? "Actualizar Tarea" : "Añadir Tarea"}
        </button>
      </form>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Lista de Tareas</h2>
        <DataTable columns={columns} data={tasks} pagination />
      </div>
    </div></>
  );
};

export default Tasks;
