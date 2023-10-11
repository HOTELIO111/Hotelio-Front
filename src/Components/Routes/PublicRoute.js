import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuthContext } from "../../context/userAuthContext";

const PublicRoute = (props) => {
  const { currentUser } = useAuthContext()
  const { Component } = props;
  return currentUser ? <Navigate to="/dashboard" /> : <Component />;
};

export default PublicRoute;
