//Este middleware servirá para validar los datos de entrada de los usuarios tanto en el registro como en el login.
//De manera que si los datos no son válidos, se devolverá un error con el mensaje correspondiente.

//Le pasamos el schema y el request, response y next.
export const validateSchema = (schema) => (req, res, next) => {
    //Intentamos parsear los datos del body, params y query de la request
    //Si hay un error, devolvemos un error 400 con el mensaje del error
    //Si no hay error, llamamos a la función next para continuar con la ejecución del código
    try {
        //Parseamos los datos que llegan del req.body con el schema que le pasamos
        schema.parse(req.body);

        //Ejecutamos la función next para continuar con la ejecución del código
        next();
        
    } catch (error) {
        res.status(400).json({
            message: error.errors[0].message
        });
    }

    

}