const axios = require('axios');

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});