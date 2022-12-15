import axios from 'axios';
const baseUrl = '/api';

const registrar_responsable = (responsable) => {
    const request = axios.post(baseUrl + '/registro/responsable', responsable);
    return request.then((response) => {
        console.log(response.data);
        return response.data;
    });
};

const registrar_residente = (residente) => {
    const request = axios.post(baseUrl + '/registro/residente', residente);
    return request.then((response) => {
        console.log(response.data);
        return response.data;
    });
};

// eslint-disable-next-line
export default {
    registrar_responsable,
    registrar_residente,
};
