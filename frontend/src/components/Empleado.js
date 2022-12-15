import React from 'react';

const Empleado = ({ empleado, toggleEditar }) => {
    const procesa_fecha = () => {
        return empleado.FECHA_CONTRATACION.split('T')[0];
    };

    return (
        <tr>
            <td>{empleado.DOCUMENTO}</td>
            <td>{empleado.NOMBRES}</td>
            <td>{empleado.APELLIDOS}</td>
            <td>{procesa_fecha()}</td>
            <td>{empleado.CARGO}</td>
            <td>{empleado.SALARIO}</td>
            <td>
                <button onClick={() => toggleEditar(empleado, procesa_fecha())}>
                    Editar
                </button>
            </td>
        </tr>
    );
};

export default Empleado;
