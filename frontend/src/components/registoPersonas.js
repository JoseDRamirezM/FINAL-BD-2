import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Componente que se encarga de la funcionalidad de la
 * asistencia de los pasantes
 * @param {*} props
 * @returns
 */

const RegistroPersona = (props) => {
    return (
        <div>
            <Container spacing={2} justify="center">
                <h1>Registro de personas</h1>
                <hr />
                {/* Formulario para ingresar el código de empleado */}
                <Form onSubmit={props.handleRegistrarPersona}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <h4>Seleccione un tipo</h4>
                        <Form.Select onChange={props.handleTipoPersona}>
                            {props.listaTipoPersona.map((option) => (
                                <option key={option.id} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <hr />
                    <h4>Datos básicos</h4>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tipo identificación</Form.Label>
                        <Form.Select onChange={props.handleTipoIdentificacion}>
                            {props.listaTiposId.map((option) => (
                                <option key={option.id} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Label>Numero identificación</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="100012XXX"
                            pattern="[0-9]"
                            value={props.numIdentificacion || ''}
                            onChange={props.handleNumIdentificacion}
                        />
                        <Form.Label>Nombre Completo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Pepito Perez"
                            value={props.nombreCompleto}
                            onChange={props.handleNombreCompleto}
                        />
                        <Form.Label>Género</Form.Label>
                        <Form.Select onChange={props.handleGenero}>
                            {props.listaGeneros.map((option) => (
                                <option key={option.id} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Label>Fecha nacimiento</Form.Label>
                        <Form.Control
                            type="date"
                            value={props.fechaNacimiento}
                            onChange={props.handleFechaNacimiento}
                        />
                    </Form.Group>
                    {props.tipoPersona === 'Responsable' && (
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <hr />
                            <h4>Datos adicionales para {props.tipoPersona}</h4>
                            <Form.Label>Teléfono de residencia</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="310XXXXXX"
                                value={props.telResidencia}
                                pattern="[0-9]"
                                onChange={props.handleTelResidencia}
                            />
                            <Form.Label>Teléfono de trabajo</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="310XXXXXX"
                                value={props.telTrabajo}
                                pattern="[0-9]"
                                onChange={props.handleTelTrabajo}
                            />
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="example@example.com"
                                value={props.correo}
                                onChange={props.handleCorreo}
                            />
                        </Form.Group>
                    )}
                    {props.tipoPersona === 'Residente' && (
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <hr />
                            <h4>Datos adicionales para {props.tipoPersona}</h4>
                            <Form.Label>Fecha ingreso</Form.Label>
                            <Form.Control
                                type="date"
                                value={props.fechaIngresoResidente}
                                onChange={props.handleFechaIngresoResidente}
                            />
                        </Form.Group>
                    )}
                    <Button variant="primary" type="submit">
                        Registrar
                    </Button>
                </Form>
            </Container>
        </div>
    );
};
export default RegistroPersona;
