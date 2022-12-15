import React from 'react';

const EditarEmpleado = (props) => {
    return (
        <div>
            <h1>Editar</h1>
            <form onSubmit={props.editarEmpleado}>
                <table className="form">
                    <tbody>
                        <tr>
                            <td>Documento</td>
                            <td>
                                <input
                                    value={props.editarDocumento}
                                    onChange={props.handleEditarDocumento}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Nombres</td>
                            <td>
                                <input
                                    type="text"
                                    value={props.editarNombres}
                                    onChange={props.handleEditarNombres}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Apellidos</td>
                            <td>
                                <input
                                    type="text"
                                    value={props.editarApellidos}
                                    onChange={props.handleEditarApellidos}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Fecha contratacion</td>
                            <td>
                                <input
                                    type="date"
                                    value={props.editarFechaContratacion}
                                    onChange={
                                        props.handleEditarFechaContratacion
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
                                    value={props.editarCargo}
                                    onChange={props.handleEditarCargo}
                                    className="input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Salario</td>
                            <td>
                                <input
                                    type="number"
                                    value={props.editarSalario}
                                    onChange={props.handleEditarSalario}
                                    className="input"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="space">
                    <button type="submit" className="button">
                        Editar
                    </button>
                </div>
            </form>
        </div>
    );
};
export default EditarEmpleado;
