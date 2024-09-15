// GlobalApi.js
import axios from 'axios';

const BASE_URL = "http://192.168.100.14:1337/api"; // Existing API base URL
const BACKEND_URL = "https://myproj-1.onrender.com/api"; // Backend URL authentication

const API_KEY = '22aa7adcfa0dedae84f6deded16bdf1794bc084dfe97ea1d8816a646333276d8441044fa280f68b87651d3421f571d0e383c452df2ba7cf11b5a8bedd27b51f9712e4d68d518f2940c190cf9b66f64717597438561a4163def7ee3c25fd213ebfce4c2d206b3f657449744f568472ac3917220d07b1adc336320d9cb6d20d77c';

const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': 'Bearer ' + API_KEY
    }
});

const BackendAxiosInstance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Existing API functions
const getSlider = () => AxiosInstance.get('/sliders?populate=*');
const getCategories = () => AxiosInstance.get("/categories?populate=*");
const getClinics = () => AxiosInstance.get("/clinics?filters[Premium][$eq]=true&populate=*");
const getClinicsByCategory = (category) => AxiosInstance.get("/clinics?filters[categories][name][$in]=" + category + "&populate=*");

// New logic for fetching doctors
const createAppointement = (data) => AxiosInstance.post('/appointments', data);
const getUserAppointements = (email) => AxiosInstance.get('/appointments?filters[Email][$eq]=' + email + "&populate=*");
const getDoctors = () => AxiosInstance.get("/doctors?filters[Availability][$eq]=true&populate=*");
const getDoctorsByCategory = (category) => AxiosInstance.get(`/doctors?filters[categories][name][$in]=${category}&populate=*`);
const getAllClinics= () => AxiosInstance.get("/clinics?populate=*");
const getAllDoctors = () => AxiosInstance.get("/doctors?&populate=*");

// New authentication functions
const login = (data) => BackendAxiosInstance.post('/auth/login', data);
const googleOAuthCallback = (code) => BackendAxiosInstance.post('/auth/google/callback', { code });

export default {
    getSlider,
    getCategories,
    getClinics,
    getClinicsByCategory,
    getDoctors,
    getDoctorsByCategory,
    createAppointement,
    getAllClinics,
    getAllDoctors,
    getUserAppointements,
    login, // Export the new function
    googleOAuthCallback // Export the new function
};