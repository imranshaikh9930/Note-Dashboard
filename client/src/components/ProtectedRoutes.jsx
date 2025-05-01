import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null); 
  const { user } = useContext(AuthContext);

  useEffect(() => {
    
    const checkAuth = async () => {
      try {
        
        const res = await axios.get("https://note-dashboard-backend-01.onrender.com/protected", {
          withCredentials: true,
        });
        
        console.log(res);
        if (res.status === 200 && res.data.user) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        console.log(err);
        setAuthenticated(false); 
      }
    };

    checkAuth();
  }, []); 

 
  if (authenticated === null) return <div>Loading...</div>;

  
  if (authenticated === false) return <Navigate to="/" replace />;

 
  return children;
};

export default ProtectedRoute;
