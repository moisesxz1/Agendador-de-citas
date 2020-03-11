import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL 
})


export default clienteAxios;

// ahora cuando se importe el cliente axios ya va a tener el localhost:4000 y se puede utilizar las diferentes rutas sin escribir el dominio