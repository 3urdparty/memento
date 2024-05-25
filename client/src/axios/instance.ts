import axios from "axios";

export const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    common: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});
