import Swal from "sweetalert2";
import instance from "../_utils";
import * as contant from "../constants/agentConstants";
import { Navigate, useNavigate } from "react-router-dom";

export const GetAgentSignup = (formData) => {
  return async (dispatch) => {
    dispatch({ type: contant.CREATE_AGENT_LOADING });
    try {
      const response = await instance.post("/api/agent/auth/signup", formData);
      if (response.status === 200) {
        MessageShow("Welcome To Hotelio ! Registration Success", "success");
        dispatch({ type: contant.CREATE_AGENT_ERROR, payload: response.data });
      } else {
        MessageShow(response.data.message, "error");
      }
    } catch (error) {
      dispatch({ type: contant.CREATE_AGENT_ERROR });
      console.log(error);
    }
  };
};



export const MessageShow = (message, error) => {
  return Swal.fire({ icon: error, title: message });
};
