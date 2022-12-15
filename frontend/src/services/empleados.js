import axios from 'axios';
const baseUrl = '/api/empleados';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => {
        console.log(response.data);
        return response.data;
    });
};

const create = (newEmpleado) => {
    const request = axios.post(baseUrl + '/crear', newEmpleado);
    return request.then((response) => response.data);
};

const update = (empleado) => {
    const request = axios.post(baseUrl + '/modificar', empleado);
    return request.then((response) => response.data);
};

export default { getAll, create, update };
