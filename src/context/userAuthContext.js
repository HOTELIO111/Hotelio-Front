import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { buildQueryString } from "../Utilis/_fuctions";
import { API_URL } from "../config";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";



const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [isUser, setIsUser] = useState()

    const [Loader, setLoader] = useState(false);

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("customer"))
    );

    // google login signup function 
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => IfSuccessAuth(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    // logout
    const logOut = () => {
        googleLogout();
        // setProfile(null);
    };


    const IfSuccessAuth = async (codeResponse) => {
        if (codeResponse) {
            try {
                const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${codeResponse.access_token}`,
                        Accept: 'application/json'
                    }
                });

                if (response.status === 200) {
                    setLoader(true)
                    try {
                        const isUser = await axios.post(`${API_URL}/api/google/auth`, response.data)
                        if (isUser.status === 200) {
                            sessionStorage.setItem('customer', JSON.stringify(isUser.data.data))
                            setCurrentUser(isUser.data.data)
                            console.log('user login successfully')
                            setLoader(false)
                            window.location.href = "/"
                        }
                    } catch (error) {
                        setLoader(false)
                        console.log(error)
                    }

                }
                // setProfile(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    };



    return <AuthContext.Provider value={{ setIsUser, isUser, Loader, setLoader, setCurrentUser, currentUser, login, logOut }}>
        {children}
    </AuthContext.Provider>
}


const useAuthContext = () => {
    return useContext(AuthContext); // Use AuthContext here instead of AuthProvider
}

export { AuthProvider, useAuthContext } 