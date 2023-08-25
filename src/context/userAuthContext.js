import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { buildQueryString, validateInput } from "../Utilis/_fuctions";
import { API_URL } from "../config";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";



const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [isUser, setIsUser] = useState()

    const [Loader, setLoader] = useState(false);

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("customer"))
    );
    // otp response state
    const [otpResp, setOtpResp] = useState({})

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




    // send the otp 

    const sendOtp = async (number) => {
        setLoader(true);
        // check the input type
        const isInput = validateInput(number);
        //  ====================================================
        // email credentials
        const formd = {
            email: `${number}`,
            format: "otp",
        };
        const queryString = buildQueryString(formd);
        try {
            let response;
            if (isInput === "mobile") {
                response = await axios.get(API_URL + "/verify/mobile/" + number);
            } else if (isInput === "email") {
                response = await axios.get(API_URL + "/verify/email?" + queryString);
            } else {
                Swal.fire({
                    text: "Please enter a valid email or mobile number",
                });
            }

            if (response.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: `We sended you a otp on ${isInput} ${number}`,
                    showConfirmButton: false,
                    timer: 1500
                })
                setOtpResp(response.data)
                // handleNext();
                setLoader(false);
            } else {
                Swal.fire({
                    title: response.data.message,
                    icon: "error",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Otp Send Failed ! Try Again",
                icon: "error",
            });
            setLoader(false);
        }
    };



    return <AuthContext.Provider value={{ setIsUser, isUser, Loader, setLoader, setCurrentUser, currentUser, login, logOut, sendOtp, otpResp }}>
        {children}
    </AuthContext.Provider>
}


const useAuthContext = () => {
    return useContext(AuthContext); // Use AuthContext here instead of AuthProvider
}

export { AuthProvider, useAuthContext } 