import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 console.log(children)
  // Verificar si el usuario está autenticado (ej. verificando el token en localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
