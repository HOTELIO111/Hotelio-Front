import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { buildQueryString, validateInput } from "../Utilis/_fuctions";
import { API_URL } from "../config";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUser, setIsUser] = useState();
  const [token, setToken] = useState(null);

  const [Loader, setLoader] = useState(false);

  // all amenities
  const [amenities, setAmenities] = useState([]);
  const [propertyType, setPropertyType] = useState([]);

  const [facilities, setFacilities] = useState([]);
  const [roomType, setRoomType] = useState([]);

  const [currentUser, setCurrentUser] = useState(
    // JSON.parse(localStorage.getItem("customer"))
  );
  // otp response state
  const [otpResp, setOtpResp] = useState({});

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setLoader(true); // Show loader while processing
      IfSuccessAuth(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    window.localStorage.removeItem("customer");
    window.localStorage.removeItem("token");
    setCurrentUser(null); // Clear current user
  };
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "customer") {
        setCurrentUser(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);


  const IfSuccessAuth = async (codeResponse) => {
    if (codeResponse) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.status === 200) {
          try {
            const isUser = await axios.post(
              `${API_URL}/api/google/auth`,
              response.data,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (isUser.status === 200) {
              window.localStorage.setItem("customer", JSON.stringify(isUser.data.data));
              window.localStorage.setItem("token", isUser.data.token);
              setCurrentUser(isUser.data.data);
              console.log("User logged in successfully");
              setLoader(false); // Hide the loader
              window.history.back();
            }
          } catch (error) {
            setLoader(false); // Hide the loader in case of an error
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // update mobile or email

  const AddEmailAndMobile = async (data, otp, otpid, cid) => {
    const inputValue = validateInput(data);
    try {
      const queryString = new URLSearchParams({
        otp,
        otpid,
        id: cid,
        key: inputValue,
        value: data,
      }).toString();
      const response = await axios.patch(
        API_URL + "/api/update?" + queryString
      );
      console.log(API_URL + "/api/update?" + queryString);

      if (response.status === 200) {
        Swal.fire({
          text: "Successfully updated",
          icon: "success",
        });
        sessionStorage.setItem("customer", JSON.stringify(response.data.data));
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      Swal.fire({
        text: "An error occurred while updating: " + error.message,
        icon: "error",
      });
    }
  };

  // send the otp

  const sendOtp = async (number) => {
    // check the input type
    const isInput = validateInput(number);
    //  ====================================================
    // email credentials
    const formd = {
      email: `${number}`,
      format: "otp",
    };
    const queryString = buildQueryString(formd);
    console.log(number, queryString);
    try {
      let response;
      if (isInput === "mobileNo") {
        response = await axios.get(API_URL + "/verify/mobile/" + number);
      } else if (isInput === "email") {
        response = await axios.get(API_URL + "/verify/email?" + queryString, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        Swal.fire({
          text: "Please enter a valid email or mobile number",
        });
      }

      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: `We sended you a otp on ${isInput} ${number}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setOtpResp(response.data);
        // handleNext();
      } else {
        Swal.fire({
          title: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Otp Send Failed ! Try Again",
        icon: "error",
      });
    }
  };

  // Get All Amenities
  const GetAllAmenities = async () => {
    try {
      const response = await axios.get(`${API_URL}/amenity/get`);
      if (response.status === 200) {
        setAmenities(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all facilities
  const GetAllFacilities = async () => {
    try {
      const response = await axios.get(`${API_URL}/facility/get`);
      if (response.status === 200) {
        setFacilities(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all facilities
  const GetAllRoomTypes = async () => {
    try {
      const response = await axios.get(`${API_URL}/roomtype/get`);
      if (response.status === 200) {
        setRoomType(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all the property type
  const GetAllPropertyTyppes = async () => {
    try {
      const response = await axios.get(`${API_URL}/property-type/get`);
      if (response.status === 200) {
        setPropertyType(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllAmenities();
    GetAllFacilities();
    GetAllRoomTypes();
    GetAllPropertyTyppes();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setIsUser,
        isUser,
        Loader,
        setToken,
        token,
        setLoader,
        setCurrentUser,
        currentUser,
        login,
        logOut,
        sendOtp,
        otpResp,
        AddEmailAndMobile,
        GetAllAmenities,
        GetAllRoomTypes,
        GetAllFacilities,
        facilities,
        roomType,
        amenities,
        propertyType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext); // Use AuthContext here instead of AuthProvider
};

export { AuthProvider, useAuthContext };
