import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

/**
 * Este componente renderiza la página principal
 * tanto para usuarios autenticados como anónimos
 * @param {*} props
 * @returns
 */

const Principal = (props) => {
    return (
        <div>
            <Container spacing={2} justify="center">
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title>Bienvenido</Card.Title>
                        <Card.Text>
                            Este es el sistema de gestión para propiedades
                            horizontales
                        </Card.Text>
                        <Card.Text>
                            <strong> Fecha: </strong>
                            {props.fechaHora}
                        </Card.Text>
                        <Card.Link href="/registrarPersona">
                            Registrar personas
                        </Card.Link>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};
export default Principal;
