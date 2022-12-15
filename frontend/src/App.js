import React, { useState, useEffect } from 'react';
import empleadosService from './services/empleados';
import Empleado from './components/Empleado';
import EmpleadoForm from './components/EmpleadoForm';
import EditarEmpleado from './components/EditarEmpleado';

const App = () => {
    const [empleados, setEmpleados] = useState([]);

    /* Estado del form de agregar */
    const [nuevoDocumento, setNuevoDocumento] = useState('');
    const [nuevoNombres, setNuevoNombres] = useState('');
    const [nuevoApellidos, setNuevoApellidos] = useState('');
    const [nuevoFechaContratacion, setFechaContratacion] = useState('');
    const [nuevoCargo, setNuevoCargo] = useState('');
    const [nuevoSalario, setNuevoSalario] = useState('');

    /* Manejadores de el estado del form para agregar un empleado */
    const handleNuevoDocumento = (event) =>
        setNuevoDocumento(event.target.value);
    const handleNuevoNombres = (event) => setNuevoNombres(event.target.value);
    const handleNuevoApellidos = (event) =>
        setNuevoApellidos(event.target.value);
    const handleNuevoFechaContratacion = (event) =>
        setFechaContratacion(event.target.value);
    const handleNuevoCargo = (event) => setNuevoCargo(event.target.value);
    const handleNuevoSalario = (event) => setNuevoSalario(event.target.value);

    /**
     * Estado del form para editar un empleado
     */

    const [showEditar, setShowEditar] = useState(false);

    const [editarID, setEditarID] = useState('');
    const [editarDocumento, setEditarDocumento] = useState('');
    const [editarNombres, setEditarNombres] = useState('');
    const [editarApellidos, setEditarApellidos] = useState('');
    const [editarFechaContratacion, setEditarFechaContratacion] = useState('');
    const [editarCargo, setEditarCargo] = useState('');
    const [editarSalario, setEditarSalario] = useState('');

    /* Manejadores de el estado del form para editar un empleado */
    const handleEditarDocumento = (event) =>
        setEditarDocumento(event.target.value);
    const handleEditarNombres = (event) => setEditarNombres(event.target.value);
    const handleEditarApellidos = (event) =>
        setEditarApellidos(event.target.value);
    const handleEditarFechaContratacion = (event) =>
        setEditarFechaContratacion(event.target.value);
    const handleEditarCargo = (event) => setEditarCargo(event.target.value);
    const handleEditarSalario = (event) => setEditarSalario(event.target.value);

    /* Hook que obtiene todos los empleados cuando se 
       carga la pagina
    */
    const hook = () => {
        empleadosService.getAll().then((initEmpleados) => {
            setEmpleados(initEmpleados);
        });
    };

    const toggleEditar = (empleado, fecha) => {
        setShowEditar(true);
        setEditarID(empleado.ID);
        setEditarDocumento(empleado.DOCUMENTO);
        setEditarNombres(empleado.NOMBRES);
        setEditarApellidos(empleado.APELLIDOS);
        setEditarFechaContratacion(fecha);
        setEditarCargo(empleado.CARGO);
        setEditarSalario(empleado.SALARIO);
    };

    /**
     * Logica del frontend para agregar un usuario
     * @param {} event
     */

    const addNewEmpleado = (event) => {
        event.preventDefault();
        if (
            nuevoDocumento &&
            nuevoNombres &&
            nuevoApellidos &&
            nuevoFechaContratacion &&
            nuevoCargo &&
            nuevoSalario
        ) {
            const check = empleados.filter(
                (empleado) => empleado.DOCUMENTO === nuevoDocumento
            );
            if (check.length > 0) {
                alert('duplicado');
            } else {
                const objetoNuevoEmpleado = {
                    nombres: nuevoNombres,
                    apellidos: nuevoApellidos,
                    fecha_contratacion: nuevoFechaContratacion,
                    cargo: nuevoCargo,
                    salario: nuevoSalario,
                    documento: nuevoDocumento,
                };
                console.log(objetoNuevoEmpleado);
                empleadosService
                    .create(objetoNuevoEmpleado)
                    .then((newEmpleado) => {
                        window.location.reload();
                        console.log(newEmpleado);
                    })
                    .catch((error) => console.log(error.message));
            }
        }
    };

    const editarEmpleado = (event) => {
        event.preventDefault();
        if (
            editarDocumento &&
            editarNombres &&
            editarApellidos &&
            editarFechaContratacion &&
            editarCargo &&
            editarSalario
        ) {
            const check = empleados.filter(
                (empleado) => empleado.DOCUMENTO === editarDocumento
            );
            if (check.length > 0 && editarID !== check.pop().ID) {
                alert('Ya existe un empleado con ese documento');
            } else {
                const empleadoActualizado = {
                    ID: parseInt(editarID),
                    nombres: editarNombres,
                    apellidos: editarApellidos,
                    fecha_contratacion: editarFechaContratacion,
                    cargo: editarCargo,
                    salario: parseInt(editarSalario),
                    documento: editarDocumento,
                };
                empleadosService
                    .update(empleadoActualizado)
                    .then((actualizado) => {
                        window.location.reload();
                        console.log(actualizado);
                    })
                    .catch((error) => console.log(error.message));
            }
        }
    };

    useEffect(hook, []);

    return (
        <div>
            <h1>Empleados</h1>
            <table>
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Fecha Contratacion</th>
                        <th>Cargo</th>
                        <th>Salario</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado) => (
                        <Empleado
                            key={empleado.ID}
                            empleado={empleado}
                            toggleEditar={toggleEditar}
                        />
                    ))}
                </tbody>
            </table>
            <hr></hr>
            <h1>Agregar</h1>
            <EmpleadoForm
                addNuevoEmpleado={addNewEmpleado}
                nuevoDocumento={nuevoDocumento}
                nuevoNombres={nuevoNombres}
                nuevoApellidos={nuevoApellidos}
                nuevoFechaContratacion={nuevoFechaContratacion}
                nuevoCargo={nuevoCargo}
                nuevoSalario={nuevoSalario}
                handleNuevoDocumento={handleNuevoDocumento}
                handleNuevoNombres={handleNuevoNombres}
                handleNuevoApellidos={handleNuevoApellidos}
                handleNuevoFechaContratacion={handleNuevoFechaContratacion}
                handleNuevoCargo={handleNuevoCargo}
                handleNuevoSalario={handleNuevoSalario}
            />
            <hr></hr>
            {showEditar && (
                <EditarEmpleado
                    editarEmpleado={editarEmpleado}
                    editarDocumento={editarDocumento}
                    editarNombres={editarNombres}
                    editarApellidos={editarApellidos}
                    editarFechaContratacion={editarFechaContratacion}
                    editarCargo={editarCargo}
                    editarSalario={editarSalario}
                    handleEditarDocumento={handleEditarDocumento}
                    handleEditarNombres={handleEditarNombres}
                    handleEditarApellidos={handleEditarApellidos}
                    handleEditarFechaContratacion={
                        handleEditarFechaContratacion
                    }
                    handleEditarCargo={handleEditarCargo}
                    handleEditarSalario={handleEditarSalario}
                />
            )}
        </div>
    );
};

export default App;
