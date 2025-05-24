//Importamos jwt
import jwt from 'jsonwebtoken';

//Importamos el Token_Secret de config.js
import {TOKEN_SECRET} from '../config.js';

//Importamos userSaved de user.controller.js


//Exportamos la función createAccessToken
export function createAccessToken(payload){

    //Retornamos una promesa que recibe dos parámetros, resolve y reject
    return new Promise((resolve, reject) => {

        jwt.sign(
            // Le pasamos el payload que queremos guardar en el token
            payload, 
            //Clave secreta   Tiempo de expiración del token (1 día)
            TOKEN_SECRET,     {expiresIn: "1d"},
            
            
        
        // Una vez que se firma el token, se ejecuta una función de callback que recibe un error y el token
        (err, token) => {
            // Si hay un error, lanzamos una excepción y que se imprima en la consola el error
            //if(err) throw err, console.log(err);
            //CAMBIO
            if(err) reject(err)
            // Si no hay error, resolvemos la promesa con el token
            resolve(token);
            
        });

    });

}