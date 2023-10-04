import axios from "axios";
import { API_URL } from "../config";

const token = window.localStorage.getItem("user");

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
