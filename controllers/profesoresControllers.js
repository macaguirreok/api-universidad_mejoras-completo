import connection from "../database.js";

export const getProfesores = async (req, res) => {
    /* req tiene la petición que llega, res nos permite enviar una
    respuesta al cliente */
    
    try{
        /* Ponemos el try porque la consulta puede fallar por problemas de conexión,
        errores en el nombre de una tabla o columna, problemas de permisos, etc.  */

        /* [profesores] recibe el primer elemento del resultado que devuelve mysql2 */

        const [profesores] = await connection.query( /* [profesores] destructuración de arrays */
            "SELECT * FROM profesores"
        );

        res.status(200).json(profesores); //convierte a profesores en JSON


    }catch(error){

        console.error(error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }

}