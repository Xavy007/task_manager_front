import React, { useState, useEffect } from 'react';

const FormularioTarea = ({ tareaEditar, onSubmit }) => {
  // Estado para el formulario (título, descripción, fecha y estado)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fecha: '',
    estado: 'pendiente',
  });

  // UseEffect para llenar el formulario si estamos editando una tarea existente
  useEffect(() => {
    if (tareaEditar) {
      setFormData({
        title: tareaEditar.title,
        description: tareaEditar.description,
        fecha: tareaEditar.fecha,
        estado: tareaEditar.estado,
      });
    }
  }, [tareaEditar]);  // Este useEffect se ejecutará cuando cambie la tarea a editar

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);  // Pasamos los datos del formulario al callback onSubmit
    setFormData({
      title: '',
      description: '',
      fecha: '',
      estado: 'pendiente',
    });  // Limpiamos el formulario después de enviar
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          {tareaEditar ? 'Editar Tarea' : 'Agregar Nueva Tarea'}
        </h2>
        
        {/* Contenedor de los campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">

          {/* Campo Título */}
          <div className="flex items-center">
            <label htmlFor="title" className="block text-sm font-medium mr-4 w-32">
              Título:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ingrese el título de la tarea"
            />
          </div>

          {/* Campo Descripción */}
          <div className="flex items-center">
            <label htmlFor="description" className="block text-sm font-medium mr-4 w-32">
              Descripción:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Descripción de la tarea"
            />
          </div>

        </div>

        {/* Contenedor de los siguientes campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">

          {/* Campo Fecha */}
          <div className="flex items-center">
            <label htmlFor="fecha" className="block text-sm font-medium mr-4 w-32">
              Fecha:
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          

        </div>

        {/* Botón de Enviar */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          {tareaEditar ? 'Actualizar Tarea' : 'Agregar Tarea'}
        </button>
      </form>
    </div>
  );
};

export default FormularioTarea;
