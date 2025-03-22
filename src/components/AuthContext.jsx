import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; 

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 console.log(user)
 
  useEffect(() => {
    const token = Cookies.get("token"); 
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    console.log(token)
    Cookies.set("token", token, { expires: 1, secure: true, sameSite: "Strict" }); 
    setUser({ token });
  };

  const logout = () => {
    Cookies.remove("token"); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
