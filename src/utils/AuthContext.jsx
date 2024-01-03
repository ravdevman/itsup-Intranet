import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);
	const login = (userData) => {
		// Assuming your API response includes user information upon successful login
		setUser(userData);
	  };
	
	  const logout = () => {
		setUser(null);
	  };
	
	  return (
		<AuthContext.Provider value={{ user, login, logout }}>
		  {children}
		</AuthContext.Provider>
	  );
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
	  throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
  };