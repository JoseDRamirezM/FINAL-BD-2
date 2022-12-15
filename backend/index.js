const express = require('express');
const oracledb = require('oracledb');
const { autoCommit } = require('oracledb');
const app = express();

app.use(express.json());

/** Constantes del estado de los elementos */
const PRESTADO = '2';
let CONSECPERSONA = 1;

/** Datos de conexión */
const conn_data = {
    user: 'adminConjunto',
    password: 'adminConjunto',
    connectionString: 'localhost',
};

const result_format = {
    resultSet: true,
    outFormat: oracledb.OUT_FORMAT_OBJECT,
};

/**
 * CONSULTA PARA DETERMINAR SI EL CÓDIGO CORRESPONDE A UN AUXILIAR
 */
const consulta_auxiliar = `
SELECT * FROM
(
    SELECT DISTINCT A.CODEMPLEADO CODIGO, A.NOMEMPLEADO||' '||A.APELLEMPLEADO NOMBRE,
        C.DESCARGO CARGO, E.NOMESPACIO SEDE, EA.FECHACARGO
    FROM EMPLEADO A, EMPLEADO_CARGO EA, CARGO C, ESPACIO E, TIPOESPACIO TE
    WHERE A.CODEMPLEADO = EA.CODEMPLEADO AND
        EA.IDCARGO = C.IDCARGO AND EA.CODESPACIO = E.CODESPACIO
        AND E.IDTIPOESPACIO = TE.IDTIPOESPACIO
        AND LOWER(TE.DESCTIPOESPACIO) LIKE 'sede%'
        AND (LOWER(C.DESCARGO) LIKE 'auxiliar%'
        OR LOWER(C.DESCARGO) LIKE 'director%deportivo')
        AND EA.FECHAFINCAR IS NULL
        AND A.CODEMPLEADO = :id
    ORDER BY EA.FECHACARGO
) WHERE ROWNUM = 1
`;

/**
 * consulta si en el momento de la consulta
 * día y hora, hay un curso para un docente en específico
 */
const consulta_curso_docente = `
SELECT P.CONSECPROGRA COD, E.NOMESPACIO ESPACIO, 
    D.NOMDEPORTE DEPORTE, P.NOINSCRITO INSCRITOS,
    DOC.NOMEMPLEADO||' '||DOC.APELLEMPLEADO DOCENTE,
    DOC.CODEMPLEADO CODEMPLEADO,
    P.IDHORA HORAINICIO, P.HOR_IDHORA HORAFIN, D.NOMDIA
FROM ESPACIO E, TIPOESPACIO TE,
    DEPORTE D, PROGRAMACION P,
    ACTIVIDAD A,
    EMPLEADO_CARGO EC, EMPLEADO DOC, DIA D, CARGO C
WHERE P.IDDEPORTE = D.IDDEPORTE
    AND P.CODESPACIO = E.CODESPACIO
    AND E.CODESPACIO = EC.CODESPACIO
    AND EC.CODEMPLEADO = DOC.CODEMPLEADO
    AND P.IDACTIVIDAD = A.IDACTIVIDAD
    AND LOWER(P.IDACTIVIDAD) LIKE 'cu'
    AND P.IDDIA = D.IDDIA
    AND EC.IDCARGO = C.IDCARGO
    AND E.IDTIPOESPACIO = TE.IDTIPOESPACIO
    AND LOWER(C.DESCARGO) LIKE 'docente%'
    AND LOWER(E.NOMESPACIO) LIKE :sede
    AND (LOWER(DOC.NOMEMPLEADO||' '||DOC.APELLEMPLEADO))
    LIKE :nomempleado
    AND LOWER(D.NOMDIA) LIKE :dia
`;

/**
 * CONSULTA PARA DETERMINAR LOS ELEMENTOS PARA PRESTAR AL DOCENTE
 */
const consulta_elementos_docente = `
SELECT ED.CONSECELEMENTO ID, TE.DESCTIPOELEMENTO TIPO, 
    E.DESCESTADO ESTADO, D.NOMDEPORTE DEPORTE, ES.NOMESPACIO ESPACIO
FROM ELEMENDEPORTIVO ED, ESTADO E, TIPOELEMENTO TE, 
    DEPORTE D, TIEL_DEP TID, ESP_DEP ESD, ESPACIO ES
WHERE ED.IDESTADO = E.IDESTADO 
    AND ED.IDTIPOELEMENTO = TE.IDTIPOELEMENTO
    AND TE.IDTIPOELEMENTO = TID.IDTIPOELEMENTO
    AND TID.IDDEPORTE = D.IDDEPORTE
    AND D.IDDEPORTE = ESD.IDDEPORTE
    AND ESD.CODESPACIO = ES.CODESPACIO
    AND LOWER(E.DESCESTADO) LIKE 'activo'
    AND LOWER(D.NOMDEPORTE) LIKE :deporte
    AND LOWER(ES.NOMESPACIO) LIKE :sede
`;

/**
 * INSERTAR EN RESPONSABLE
 */
const insertar_persona = `
INSERT INTO PERSONA
    (K_IDENTIFICACION,I_TIPOID,N_NOMBRE,
        N_GENERO,F_NACIMIENTO
    )
VALUES 
    (:K_IDENTIFICACION,:I_TIPOID,:N_NOMBRE,
        :N_GENERO,TO_DATE(:F_NACIMIENTO, 'yyyy-mm-dd')
    )
`;

const insertar_responsable = `
INSERT INTO RESPONSABLE
    (K_RESPONSABLE,Q_TELRESIDENCIA,Q_TELTRABAJO,
        N_EMAIL,K_IDENTIFICACION,K_NUMAPTO
    )
VALUES
    (:K_RESPONSABLE, :Q_TELRESIDENCIA, :Q_TELTRABAJO,
        :N_EMAIL, :K_IDENTIFICACION, :K_NUMAPTO
    )
`;

const insertar_residente = `
INSERT INTO RESIDENTE
    (K_RESIDENTE, F_INGRESO, 
        K_IDENTIFICACION, K_NUMAPTO)
VALUES
    (:K_RESIDENTE, TO_DATE(:F_INGRESO, 'yyyy-mm-dd'), 
    :K_IDENTIFICACION, :K_NUMAPTO)
`;

//########################################################################################################################################

const registrarResponsable = async (req, res) => {
    try {
        const body = req.body;
        const data = {
            TIPOPERSONA: body.TIPOPERSONA,
            TIPOIDENTIFICACION: body.TIPOIDENTIFICACION,
            NUMIDENTIFICACION: body.NUMIDENTIFICACION,
            NOMBRE: body.NOMBRE,
            GENERO: body.GENERO,
            FECHANACIMIENTO: body.FECHANACIMIENTO,
            TELRESIDENCIA: body.TELRESIDENCIA,
            TELTRABAJO: body.TELTRABAJO,
            CORREO: body.CORREO,
        };
        const data1 = {
            K_IDENTIFICACION: body.NUMIDENTIFICACION,
            I_TIPOID: body.TIPOIDENTIFICACION,
            N_NOMBRE: body.NOMBRE,
            N_GENERO: body.GENERO,
            F_NACIMIENTO: body.FECHANACIMIENTO,
        };
        const data2 = {
            K_RESPONSABLE: CONSECPERSONA,
            Q_TELRESIDENCIA: body.TELRESIDENCIA,
            Q_TELTRABAJO: body.TELTRABAJO,
            N_EMAIL: body.CORREO,
            K_IDENTIFICACION: body.NUMIDENTIFICACION,
            K_NUMAPTO: 2,
        };
        console.log(data2);
        conn = await oracledb.getConnection(conn_data);
        await conn.execute(insertar_persona, data1);
        await conn.execute(insertar_responsable, data2);
        conn.commit();
        CONSECPERSONA += 1;

        res.send({ test: 'sisas' });
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.error(error);
            }
        }
    }
};

const registrarResidente = async (req, res) => {
    try {
        const body = req.body;
        const data = {
            TIPOPERSONA: body.TIPOPERSONA,
            TIPOIDENTIFICACION: body.TIPOIDENTIFICACION,
            NUMIDENTIFICACION: body.NUMIDENTIFICACION,
            NOMBRE: body.NOMBRE,
            GENERO: body.GENERO,
            FECHANACIMIENTO: body.FECHANACIMIENTO,
            TELRESIDENCIA: body.TELRESIDENCIA,
            TELTRABAJO: body.TELTRABAJO,
            CORREO: body.CORREO,
        };
        const data1 = {
            K_IDENTIFICACION: body.NUMIDENTIFICACION,
            I_TIPOID: body.TIPOIDENTIFICACION,
            N_NOMBRE: body.NOMBRE,
            N_GENERO: body.GENERO,
            F_NACIMIENTO: body.FECHANACIMIENTO,
        };
        const data2 = {
            K_RESIDENTE: CONSECPERSONA,
            F_INGRESO: body.FECHAINGRESO,
            K_IDENTIFICACION: body.NUMIDENTIFICACION,
            K_NUMAPTO: 2,
        };
        console.log(data2);
        conn = await oracledb.getConnection(conn_data);
        await conn.execute(insertar_persona, data1);
        await conn.execute(insertar_residente, data2);
        conn.commit();
        CONSECPERSONA += 1;
        res.send({ test: 'sisas residente' });
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.error(error);
            }
        }
    }
};

app.post('/api/registro/responsable', async (request, response) => {
    registrarResponsable(request, response);
});

app.post('/api/registro/residente', async (request, response) => {
    registrarResidente(request, response);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
