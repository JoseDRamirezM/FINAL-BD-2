import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import RegistroPersona from './components/registoPersonas';
import Principal from './components/Principal';
import propiedadHorizontal from './services/propiedadHorizontal';

const App = () => {
    /**################# VARIABLES DE ESTADO ###########################*/
    const [fechaHora, setFechaHora] = useState('');

    const listaTipoPersona = [
        { id: 0, label: '' },
        { id: 1, label: 'Responsable' },
        { id: 2, label: 'Residente' },
    ];

    const [tipoPersona, setTipoPersona] = useState('Responsable');
    const handleTipoPersona = (event) => {
        setTipoPersona(event.target.value);
        console.log(tipoPersona);
    };

    const [tipoIdentificacion, setTipoIdentificacion] = useState('CC');
    const handleTipoIdentificacion = async (event) => {
        await setTipoIdentificacion(event.target.value);
        console.log(tipoIdentificacion);
    };

    const listaTiposId = [
        { id: 1, label: 'CC' },
        { id: 2, label: 'T1' },
        { id: 3, label: 'T2' },
    ];

    const [numIdentificacion, setNumIdentificacion] = useState('');
    const handleNumIdentificacion = (event) => {
        setNumIdentificacion(event.target.value);
        console.log(numIdentificacion, 'xd');
    };

    const [nombreCompleto, setNombreCompleto] = useState('');
    const handleNombreCompleto = (event) => {
        setNombreCompleto(event.target.value);
        console.log(nombreCompleto);
    };

    const [genero, setGenero] = useState('M');
    const handleGenero = async (event) => {
        await setGenero(event.target.value);
        console.log(genero);
    };

    const listaGeneros = [
        { id: 1, label: 'M' },
        { id: 2, label: 'F' },
        { id: 3, label: 'X' },
    ];

    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const handleFechaNacimiento = (event) => {
        setFechaNacimiento(event.target.value);
        console.log(fechaNacimiento);
    };

    const [fechaIngresoResidente, setFechaIngresoResidente] = useState('');
    const handleFechaIngresoResidente = (event) => {
        setFechaIngresoResidente(event.target.value);
        setTelResidencia('');
        setTelTrabajo('');
        setCorreo('');
        console.log(fechaIngresoResidente);
    };

    const [telResidencia, setTelResidencia] = useState('');
    const handleTelResidencia = (event) => {
        setTelResidencia(event.target.value);
        console.log(telResidencia);
        setFechaIngresoResidente('');
    };

    const [telTrabajo, setTelTrabajo] = useState('');
    const handleTelTrabajo = (event) => {
        setTelTrabajo(event.target.value);
        console.log(telTrabajo);
    };

    const [correo, setCorreo] = useState('');
    const handleCorreo = (event) => {
        setCorreo(event.target.value);
        console.log(correo);
    };

    /**################################################################*/

    /**################# MANEJO SUBMIT FORM ###########################*/
    const handleRegistrarPersona = (event) => {
        event.preventDefault();
        console.log(
            tipoPersona,
            tipoIdentificacion,
            numIdentificacion,
            nombreCompleto,
            genero,
            fechaNacimiento,
            fechaIngresoResidente,
            telResidencia,
            telTrabajo,
            correo
        );
        // // Verificar que los campos no estén vacíos
        if (
            tipoPersona &&
            tipoPersona === 'Responsable' &&
            tipoIdentificacion &&
            numIdentificacion &&
            nombreCompleto &&
            genero &&
            fechaNacimiento &&
            telResidencia &&
            telTrabajo &&
            correo
        ) {
            const insertar_responsable = {
                TIPOPERSONA: tipoPersona,
                TIPOIDENTIFICACION: tipoIdentificacion,
                NUMIDENTIFICACION: numIdentificacion,
                NOMBRE: nombreCompleto,
                GENERO: genero,
                FECHANACIMIENTO: fechaNacimiento,
                TELRESIDENCIA: telResidencia,
                TELTRABAJO: telTrabajo,
                CORREO: correo,
            };

            console.log(insertar_responsable);
            propiedadHorizontal
                .registrar_responsable(insertar_responsable)
                .then((curso_ahora) => {
                    console.log(curso_ahora, 'del backend');
                })
                .catch((error) => console.log(error.message));
        }

        if (
            tipoPersona &&
            tipoPersona === 'Residente' &&
            tipoIdentificacion &&
            numIdentificacion &&
            nombreCompleto &&
            genero &&
            fechaNacimiento &&
            fechaIngresoResidente
        ) {
            const insertar_residente = {
                TIPOPERSONA: tipoPersona,
                TIPOIDENTIFICACION: tipoIdentificacion,
                NUMIDENTIFICACION: numIdentificacion,
                NOMBRE: nombreCompleto,
                GENERO: genero,
                FECHANACIMIENTO: fechaNacimiento,
                FECHAINGRESO: fechaIngresoResidente,
            };

            console.log(insertar_residente);
            propiedadHorizontal
                .registrar_residente(insertar_residente)
                .then((curso_ahora) => {
                    console.log(curso_ahora, 'del backend');
                })
                .catch((error) => console.log(error.message));
        }
        //     // Objeto que tiene los datos necesarios para la consulta
        //     // del curso del docente
        //     const consulta_docente = {
        //         NOMEMPLEADO: nombreDocente,
        //         APELLEMPLEADO: apellidoDocente,
        //         DIA: diaSemana,
        //         SEDE: autorizado[0].SEDE,
        //         HORA: hora,
        //     };
        //     console.log(consulta_docente);
        //     // Llamar al manejador de la comunicación con el backend
        //     // para que realice la consulta
        //     unidadDeportivaService
        //         .consulta_docente(consulta_docente)
        //         .then((curso_ahora) => {
        //             setInfoCurso(curso_ahora);
        //             console.log(curso_ahora, 'del backend');
        //         })
        //         .catch((error) => console.log(error.message));

        //     // Objeto que contiene los datos necesarios
        //     // para consultar los elementos disponibles para
        //     // préstamo

        //     // Limpiar datos del formulario
        //     setNombreDocente('');
        //     setApellidoDocente('');
        //}
    };

    /**################################################################*/

    /**################# HOOKS PARA DATOS ###########################*/

    // Hook para actualzar fecha y hora
    useEffect(() => {
        const timer = setInterval(() => {
            setFechaHora(new Date().toLocaleString());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    });

    /**################################################################*/

    // Funcion que presenta la interfaz
    const renderAutorizado = () => {
        return (
            <div>
                <Router>
                    <div className="App">
                        {/* Barra de navegación */}
                        <Navbar bg="dark" variant="dark">
                            <Container>
                                <Navbar.Brand as={Link} to="/">
                                    Propiedad Horizontal
                                </Navbar.Brand>
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/registrarPersona">
                                        Registrar persona
                                    </Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                        <br />
                    </div>

                    {/* Se definen las rutas a las que el usuario tiene acceso y el componente
                    que maneja esa funcionalidad, tener en cuenta que se verifica que el usuario
                    esté autorizado para mostrar el componente de lo contrario redirecciona al login */}
                    <Routes>
                        <Route
                            path="/"
                            element={<Principal fechaHora={fechaHora} />}
                        />
                        <Route
                            path="/registrarPersona"
                            element={
                                <RegistroPersona
                                    handleRegistrarPersona={
                                        handleRegistrarPersona
                                    }
                                    numIdentificacion={numIdentificacion}
                                    handleNumIdentificacion={
                                        handleNumIdentificacion
                                    }
                                    tiposIdentificacion={tipoIdentificacion}
                                    handleTipoIdentificacion={
                                        handleTipoIdentificacion
                                    }
                                    listaTiposId={listaTiposId}
                                    nombreCompleto={nombreCompleto}
                                    handleNombreCompleto={handleNombreCompleto}
                                    genero={genero}
                                    handleGenero={handleGenero}
                                    listaGeneros={listaGeneros}
                                    fechaNacimiento={fechaNacimiento}
                                    handleFechaNacimiento={
                                        handleFechaNacimiento
                                    }
                                    listaTipoPersona={listaTipoPersona}
                                    tipoPersona={tipoPersona}
                                    handleTipoPersona={handleTipoPersona}
                                    fechaIngresoResidente={
                                        fechaIngresoResidente
                                    }
                                    handleFechaIngresoResidente={
                                        handleFechaIngresoResidente
                                    }
                                    telResidencia={telResidencia}
                                    handleTelResidencia={handleTelResidencia}
                                    telTrabajo={telTrabajo}
                                    handleTelTrabajo={handleTelTrabajo}
                                    correo={correo}
                                    handleCorreo={handleCorreo}
                                />
                            }
                        />
                    </Routes>
                </Router>
            </div>
        );
    };

    return <div>{renderAutorizado()}</div>;
};

export default App;
