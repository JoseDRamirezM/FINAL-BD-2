import React from 'react';

const EmpleadoForm = (props) => {
    return (
        <div>
            <form onSubmit={props.addNuevoEmpleado}>
                <table className="form">
                    <tbody>
                        <tr>
                            <td>Documento</td>
                            <td>
                                <input
                                    value={props.nuevoDocumento}
                                    onChange={props.handleNuevoDocumento}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombres</td>
                            <td>
                                <input
                                    type="text"
                                    value={props.nuevoNombres}
                                    onChange={props.handleNuevoNombres}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Apellidos</td>
                            <td>
                                <input
                                    type="text"
                                    value={props.nuevoApellidos}
                                    onChange={props.handleNuevoApellidos}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Fecha contratacion</td>
                            <td>
                                <input
                                    type="date"
                                    value={props.nuevoFechaContratacion}
                                    onChange={
                                        props.handleNuevoFechaContratacion
                                    }
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Cargo</td>
                            <td>
                                <input
                                    type="text"
                                    value={props.nuevoCargo}
                                    onChange={props.handleNuevoCargo}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Salario</td>
                            <td>
                                <input
                                    type="number"
                                    value={props.nuevoSalario}
                                    onChange={props.handleNuevoSalario}
                                    className="input"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="space">
                    <button type="submit" className="button">
                        Agregar
                    </button>
                </div>
            </form>
        </div>
    );
};
export default EmpleadoForm;
