import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const apiUrl = "http://localhost:3050/api/user";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [passwordData, setPasswordData] = useState({ password: "", confirmPassword: "" });
    const [editingUser, setEditingUser] = useState(null);
    const [changingPasswordUser, setChangingPasswordUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(apiUrl);
            setUsers(response.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await axios.put(`${apiUrl}/${editingUser._id}`, formData);
            } else {
                await axios.post(apiUrl, { ...formData, password: passwordData.password });
            }
            setFormData({ name: "", email: "" });
            setPasswordData({ password: "", confirmPassword: "" });
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error("Error al enviar usuario:", error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.password !== passwordData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        try {
            await axios.put(`${apiUrl}/${changingPasswordUser._id}/change-password`, { password: passwordData.password });
            setChangingPasswordUser(null);
            setPasswordData({ password: "", confirmPassword: "" });
            fetchUsers();
        } catch (error) {
            console.error("Error al cambiar contraseña:", error);
        }
    };

    const columns = [
        { name: "Nombre", selector: (row) => row.name, sortable: true },
        { name: "Email", selector: (row) => row.email, sortable: true },
        {
            name: "Acciones",
            cell: (row) => (
                <div>
                    <button onClick={() => handleEdit(row)} className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                    <button onClick={() => handleDelete(row.id)} className="bg-red-500 text-white px-3 py-1 rounded-md">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                    </button>
                    <button onClick={() => setChangingPasswordUser(row)} className="bg-blue-500 text-white px-3 py-1 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                        </svg>




                    </button>
                </div>
            ),
        },
    ];

    return (
        <><Navbar /><div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                {editingUser ? "Editar Usuario" : "Añadir Nuevo Usuario"}
            </h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nombre" className="w-full p-2 border border-gray-300 rounded-md" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                {!editingUser && <input type="password" name="password" value={passwordData.password} onChange={handlePasswordChange} required placeholder="Contraseña" className="w-full p-2 border border-gray-300 rounded-md mt-2" />}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md mt-4">
                    {editingUser ? "Actualizar Usuario" : "Añadir Usuario"}
                </button>
            </form>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
                <DataTable columns={columns} data={users} pagination />
            </div>
            {changingPasswordUser && (
                <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                    <h2 className="text-xl">Cambiar Contraseña para {changingPasswordUser.name}</h2>
                    <form onSubmit={handleChangePassword}>
                        <input name="password" type="password" value={passwordData.password} onChange={handlePasswordChange} placeholder="Nueva contraseña" className="border p-2 block mb-2 w-full" required />
                        <input name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} placeholder="Confirmar contraseña" className="border p-2 block mb-2 w-full" required />
                        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Actualizar</button>
                        <button onClick={() => setChangingPasswordUser(null)} className="mt-2 bg-gray-500 text-white p-2 w-full">Cancelar</button>
                    </form>
                </div>
            )}
        </div></>
    );
};

export default Users;
