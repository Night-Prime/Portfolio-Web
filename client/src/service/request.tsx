import axios from "axios";

/**
 * This is to make requests to resources on the server that are public
 */

export const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
