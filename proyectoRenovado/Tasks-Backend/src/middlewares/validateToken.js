//Importamos JWT para poder verificar el token
import jwt from 'jsonwebtoken';

//Importamos el TokenSecret que se encuentra configuración 
import { TOKEN_SECRET } from '../config.js';

//Importamos el modelo de usuario para poder utilizarlo en el middleware
import user from '../models/user.model.js';


//Creamos un middleware que se encargará de validar el token de autenticación en las rutas que lo requieran.
//next() se utiliza para pasar a la siguiente función si esta resulta satisfactoria.
//Es decir, comprobará si hay un token y en caso de que lo haya, si es válido o no. En caso de no serlo, se enviará un mensaje de error al cliente. 
//Si el token no es válido, se enviará un mensaje de error al cliente.


//Exportamos el middleware para poder utilizarlo en otros archivos (authRoutes).
export const authRequired = (req, res, next) => {

    console.log("Validando Token ...");
    
    //Obtenemos el token de las cookies
    const { token } = req.cookies;

    //Si no hay token, se enviará un mensaje de error al cliente
    if(!token){
        
        console.log("No hay token. Acceso denegado.");
        return res.status(401).json({message: "No hay token. Acceso denegado."});
        
    }else{
        jwt.verify(token, TOKEN_SECRET, (err, decoded) => {

            //y se enviará un mensaje de error al cliente
            if(err){
                console.log("Token inválido. Acceso denegado.");
                return res.status(401).json({message: "Token inválido. Acceso denegado."});
            }else{
                //Si el token es válido, se ejecutará la siguiente función
                console.log("Token válido. Acceso permitido.");

                //Guardamos el usuario decodificado en una variable user
                req.user = decoded;
                console.log("Usuario decodificado:", req.user);
                
                req.username = user;
                console.log("Usuario: ", req.username);


                //Se ejecuta la siguiente función
                next();
            }

        });
        
    }
    

};