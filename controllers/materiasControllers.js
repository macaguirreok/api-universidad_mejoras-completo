import connection from "../database.js";

export const getMaterias = async (req, res) => {
    /* req tiene la petición que llega, res nos permite enviar una
    respuesta al cliente */

    try {
        /* Ponemos el try porque la consulta puede fallar por problemas de conexión,
        errores en el nombre de una tabla o columna, problemas de permisos, etc. */

        /* [materias] recibe el primer elemento del resultado que devuelve mysql2 */

        const [materias] = await connection.query(
            "SELECT * FROM materias"
        );

        res.status(200).json(materias); // Convierte materias a JSON

    } catch(error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};





export const getUnaMateria = async (req, res) => {

    const idMateria = req.params.id;

    if (isNaN(idMateria)) {
        return res.status(400).json({
            mensaje: "El id debe ser numérico"
        });
    }

    if (idMateria < 1) {
        return res.status(400).json({
            mensaje: "El id debe ser mayor a cero"
        });
    }

    try {

        const [materia] = await connection.query(
            `SELECT
                materias.nombre,
                profesores.nombre AS nombre_profesor
            FROM materias
            INNER JOIN profesores
                ON materias.id_profesor = profesores.id_profesor
            WHERE materias.id_materia = ?`,
            [idMateria]
        );

        if (materia.length === 0) {
            return res.status(404).json({
                mensaje: "No existe la materia"
            });
        }

        res.status(200).json(materia[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};





export const postMateria = async (req, res) => {

    const nombreMateria = req.body.nombre;
    const idProfesor = req.body.id_profesor;

    if (typeof nombreMateria !== "string") {
        return res.status(400).json({
            mensaje: "El nombre tiene que ser un string"
        });
    }

    if (nombreMateria.trim() === "") {
        return res.status(400).json({
            mensaje: "El nombre de la materia no puede estar vacío"
        });
    }

    if (isNaN(idProfesor) || idProfesor === null || idProfesor === undefined || idProfesor === "") {
        return res.status(400).json({
            mensaje: "El id del profesor debe ser numérico"
        });
    }

    if (idProfesor < 1) {
        return res.status(400).json({
            mensaje: "El id del profesor debe ser mayor a cero"
        });
    }

    try {

        const [resultado] = await connection.query(
            "INSERT INTO materias(nombre, id_profesor) VALUES (?, ?)",
            [nombreMateria, idProfesor]
        );

        return res.status(201).json({
            mensaje: "Materia creada exitosamente",
            id: resultado.insertId,
            nombre: nombreMateria,
            id_profesor: idProfesor
        });

    } catch (error) {

        console.error(error);

        //Para el front. Después tendré que hacer esto en todos los errores que sean de FK.

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({
            mensaje: "El profesor no existe"
        });
    }


        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};