import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from 'sonner';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [userToken, setUserToken] = useState(localStorage.getItem("token"));
    const [userID , setUserID] = useState(localStorage.getItem('userID'))

    async function Verify() {
        if (userToken != null) {
            try {
                const response = await axios.get(
                    "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
                    { headers: { token: userToken } }
                );
                if(response?.data.decoded){
                    localStorage.setItem('userID',response.data.decoded.id)
                    setUserID(response.data.decoded.id)
                }
                console.log(response.data.message);
            } catch (error) {
                toast.error("Token verification failed");
            }
        }
    }

    Verify()

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem('userID')
        setUserID(null)
        setUserToken(null);
        toast.success("Done Logging out");
    }

    return (
        <AuthContext.Provider value={{ userToken, setUserToken, logout ,userID}}>
            {children}
        </AuthContext.Provider>
    );
}
