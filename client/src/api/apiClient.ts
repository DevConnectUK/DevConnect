import axios from "axios";
import { SERVER_URL } from "./config";

export const apiClient = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
});
