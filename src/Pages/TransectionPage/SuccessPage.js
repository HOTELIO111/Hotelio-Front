import { Card } from "@mui/material";
import React, { useEffect } from "react";
import OrderSuccessfully from "../../images/Completed.svg";
import { useAuthContext } from "../../context/userAuthContext";

const SuccessPage = () => {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = `/CustomerProfile/${currentUser?._id}`;
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
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
  );
};

export default SuccessPage;
