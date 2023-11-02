import { Card } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import OrderSuccessfully from "../../images/Completed.svg";
import { useAuthContext } from "../../context/userAuthContext";
import { API_URL } from "../../config";
import axios from "axios";
import { ClockLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";

const SuccessPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const payment = searchParams.get("payment");
  const { currentUser } = useAuthContext();
  const [loader, setLoader] = useState(false);
  const [bookingData, setBookingData] = useState(
    JSON.parse(sessionStorage.getItem("booking"))
  );

  const navigate = useNavigate();

  const HandleBookingCreation = async (formData) => {
    setLoader(true);
    try {
      const response = await axios.post(
        API_URL + "/hotel/book/create",
        formData
      );
      if (response.status === 200) {
        setLoader(false);
        console.log(response.data);
        sessionStorage.removeItem("booking");
        navigate(`/CustomerProfile/${currentUser?._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (payment === "success") {
      HandleBookingCreation(bookingData);
    }
  }, [window.location.search]);

  return (
    <>
      {loader ? (
        <ClockLoader
          style={{
            position: "absolute",
            top: "50%",
            right: "50%",
            transform: "translate(-50% , -50% )",
          }}
          loading={loader}
        />
      ) : (
        <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
          <Card
            className="text-center"
            style={{
              display: "grid",
              placeItems: "center",
              width: "auto",
              height: "500px",
              background: "#eeeeeb",
              boxShadow:
                "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
            }}
          >
            <div>
              <img
                style={{ width: "200px" }}
                src={OrderSuccessfully}
                alt="order-gif"
              />
              <p className="pt-2">
                <b>Hey, your transaction has been successfully completed.</b>
              </p>
              <p className="p-0">
                The page will navigate to your booking history in a few seconds.
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default SuccessPage;
