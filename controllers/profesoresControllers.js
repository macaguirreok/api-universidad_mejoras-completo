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



export const getUnProfesor = async ( req, res ) => {

    /*Por ejemplo, si hacemos esta petición: 
    GET http://localhost:3000/alumnos/12
    Express guarda el valor 12 en req.params.id.
    ¿Por qué se llama id y no id_alumno? Porque en tu router definiste:
    router.get("/:id", getUnAlumno);*/

    const idProfesor = req.params.id; /* req: la petición que llega, ,params: los parámetros que vienen en la URL, .id: el parámetro que definimos en nuestra ruta. */

    if(isNaN(idProfesor)){
        return res.status(400).json({
            mensaje: "El id debe ser numérico"
        });
    }

    if(idProfesor < 1){
        return res.status(400).json({
            mensaje: "El id debe ser mayor a cero"
        });
    }

    try{


    const [profesor] = await connection.query( /* Desestructurar, solamente devuelve el primer elemento de mysql, que es el array de filas. */
        "SELECT * FROM profesores WHERE id_profesor = ? ",
        [idProfesor] /* query() espera en array los parámetros, aunque
                    se trate de uno solo, por eso va [idProfesor]. */
    )

   /* Si no encuentra registros, profesor será un array vacío [].
Si encuentra uno, el array tendrá un objeto con los datos del profesor. */
    if(profesor.length == 0){
        return res.status(404).json({
            mensaje: "No existe el profesor"
        })
    }

    /*No lo ponemos en un else del if anterior, porque si ese if tiene
    un return, termina la ejecución de la función. Si no encontró al 
    profesor, nunca llega al res.status(200).json(profesor[0]) */
    res.status(200).json(profesor[0]);
    

    }catch(error){
        /* Este es el error que va a salir en la consola, para
        que yo vea que error etá pasando. */
        console.error(error); /* Se pone así para distinguir un error, de mensajes normales en la consola. */

        /*Ya mostramos el error por la consola, ahora le tenemos
        que enviar el error al cliente */

        res.status(500).json({
            mensaje : "Error interno del servidor"
        });
    }

 


}





export const postProfesor = async(req,res) => {

//La tabla profesores solo tienen id_profesor y nombre:

// El id_profesor lo va a crear la bd sola, porque es un AUTO INCREMENT en la bd
/*Esto es lo que envia la gente para crear el profesor:
{
    "nombre": "María"
} 
req.params es cuando los datos vienen en la URL ej: /profesores/5
pero cuando vienen en el cuerpo de la petición como en este caso,
se utiliza req.body */

/*NOTA: en el controller, extraemos el dato enviado en el body con el
MISMO nombre enviado en el json del thunder, todavia no tiene NADA que ver
con los nombres usados en la bd. */

const nombreProfesor = req.body.nombre;

/*La validación con typeof si o si va antes que .trim, los numeros
no tienen .trim asi que pasarían igual. */
if(typeof nombreProfesor !== "string"){
    return res.status(400).json({
        mensaje: "El nombre tiene que ser un string"
    })
}


if(nombreProfesor.trim() === ""){
    return res.status(400).json({
        mensaje : "El nombre del profesor no puede estar vacío"
    })
}


try{ 

    /* [Resultado] porque al hacer el post, Mysql2 devuelve un array
    con dos objetos, el primero contiene info como insertID y a ese
    lo obtenemos mediante la desestructuración de [Resultado] , el
    otro objeto tiene info de los campos, que si lo quisieramos, lo 
    obtendríamos de [Resultado, campos] */

    const [Resultado] = await connection.query(
        "INSERT INTO profesores(nombre) VALUES (?)",
        [nombreProfesor]
    );

    //Agregar respuesta exitosa:

    /* 200 OK: operación exitosa -> get y put
       201 Created: se creó un recurso nuevo -> post */

    
        return res.status(201).json({
            mensaje: "Registro exitoso",
            id: Resultado.insertId,
            nombre: nombreProfesor});
        

}catch(error){

    console.error(error);

    res.status(500).json({
        mensaje: "Error interno del servidor"
    })

}






}