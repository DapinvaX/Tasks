//Importamos el modulo bcrypt para encriptar las contraseñas
import bcrypt from 'bcryptjs';

//Importamos el módulo jsonwebtoken para generar tokens
//import jwt from 'jsonwebtoken';

//Importamos el createAccessToken de jwt.js
import { createAccessToken } from '../libs/jwt.js';

//Importamos el modelo User
import User from '../models/user.model.js';

import { TOKEN_SECRET } from '../config.js';



//Exportamos las funciones de registro y login

//Función para registrar un usuario
//Recibe un request y un response
//El request contiene los datos del usuario que se envían desde el cliente
//El response es la respuesta que se envía al cliente
//La función es asincrona, por lo que utilizamos async
export const register = async (req, res) => {
   
    //res.send('Registro');
    //console.log(req.body);

    //Extraemos los datos del usuario, email y password del request body
    //const {user, email, password} = req.body;
   

    //Creamos un bloque try-catch para manejar los errores que puedan surgir a la hora de registrar un usuario
    try{
        //Aquí hacemos la lógica de registro

        //Extraemos los datos del usuario, email y password del request body
        const user = req.body.user.toLowerCase();
        const email = req.body.email.toLowerCase();
        const { 
            password
            } = req.body;

            //Encriptamos la contraseña con el método hash de bcrypt
            //El método hash recibe la contraseña y el número de rondas de encriptación
            //El número de rondas es un número que se utiliza para encriptar la contraseña
            //A mayor número de rondas, más segura es la contraseña
            //El número de rondas recomendado es 10
            const passhash = await bcrypt.hash(password, 10);

            //Imprimimos los datos en la consola
            //console.log(user, email, passhash);


            //Instanciamos un nuevo usuario con los datos extraidos
            const newUser = new User({
                user, 
                email, 
                password : passhash
            });

            // Verificar si el usuario ya existe en la base de datos con el método findOne de mongoose
            // Tanto si el usuario ya existe o el email ya existe, no se puede registrar.
            const existingUser = await User.findOne({ email, user });

            if (existingUser) {
                
                // Si el usuario ya existe, mostrar un mensaje diciendo que ya existe
                console.log('NODE: El usuario ya existe');
                res.status(405).json({ Error: 'NODE: El usuario ya existe' });
                return;
                
                
            } else {
                
                // Guardamos el usuario en la base de datos con el método save
                // Al ser una función asincrona, utilizamos await para esperar a que cuando le llegue la respuesta, se guarde en la base de datos.
                // Creamos una constante userSaved para guardar el usuario guardado
                const userSaved = await newUser.save();

                // Generamos un token con el método sign de jwt
                // El método sign recibe un objeto con los datos que queremos guardar en el token
                // En este caso guardamos solo el id
                // MySecretKeyDPX es la clave secreta que utilizamos para firmar el token
                
                //JWT
                //Usamos la función createAccessToken que hemos importado para generar el token y la guardamos en una constante token
                const token = await createAccessToken({id: userSaved._id});
                

                //En vez de enviar el token al cliente (mala práctica), lo guardamos en una cookie
                //Cookie que guarda el token de sesión
                res.cookie('token', token,
                    //Configuramos la cookie para que se envíe en solicitudes de sitios cruzados y no solo en solicitudes del mismo sitio
                    //Esto es para que la cookie sea accesible desde cualquier sitio aunque no sea el mismo sitio que la generó
                    //Configuramos la cookie para que solo se envíe por HTTPS y no por HTTP y aparte que 
                    //Esto es para que la cookie sea segura y no pueda ser interceptada por un atacante
                    {
                        samesite: 'none',
                        secure: true,
                });

                //Imprimimos el token en la consola
                console.log('Token generado: ', token);
                console.log('Usuario registrado con éxito!');
                

                // Imprimimos el nuevo usuario en la consola
                res.status(200).json({
                    message : "Usuario registrado con éxito!",
                    userdata: {
                    _id: userSaved._id,
                    user: userSaved.user,
                    email: userSaved.email,
                    //passhash: userSaved.password,
                    createdAt: userSaved.createdAt,
                    updateAt: userSaved.updateAt
                    },
                });

                // Imprimimos el nuevo usuario en la consola
                //console.log(userSaved);

                // Enviamos una respuesta al cliente con los datos del usuario guardado
                //Imprimimos el usuario guardado en la consola (ahora sin la contraseña)
                //createdAt es un método de mongoose que nos da la fecha de creación del usuario
                /* res.status(200).json({
                    _id: userSaved._id,
                    user: userSaved.user,
                    email: userSaved.email,
                    //passhash: userSaved.password,
                    createdAt: userSaved.createdAt,
                    updateAt: userSaved.updateAt
                }); */
                    
                //console.log("Usuario registrado");

                //Imprimimos el usuario guardado en la consola
                //En vez de llamar a userSaved directamente, 
                //lo convertimos a un objeto JSON con JSON.stringify 
                //y mostramos solo los campos que nos interesan
                console.log(JSON.stringify({
                    _id: userSaved._id,
                    user: userSaved.user,
                    email: userSaved.email,
                    //passhash: userSaved.password,
                    createdAt: userSaved.createdAt,
                    updateAt: userSaved.updateAt
                }, null, 2));

            }

        }catch(error){
            
            //Si hay un error, lo imprimimos en la consola
            const err = error;
            console.log("Error al registrar el usuario!\nError: Error interno del servidor.", err);
            res.status(500).json({ Error: 'Error interno del servidor.' });
        
        } 
    }

export const login = async (req, res) => {
    //Aquí hacemos la lógica de login
    
    
    //res.send('Registro');
    //console.log(req.body);

    //Extraemos los datos del usuario, email y password del request body
    const user = req.body.user.toLowerCase();

    const { 
        password
        } = req.body;

    //Creamos un bloque try-catch para manejar los errores que puedan surgir a la hora de loguear un usuario
    try{
         //Aquí hacemos la lógica de login

        //Buscamos el usuario en la base de datos con el método findOne de mongoose para ver si existe
        //El método findOne recibe un objeto con el usuario o email de la persona que ha hecho el login 
        const userFound = await User.findOne({ $or: [{ user: user }, { email: user }] });

          //Comparar la contraseña introducida con la contraseña encriptada de la base de datos
            const coincidencia = await bcrypt.compare(password, userFound.password);


            //Si el usuario no existe, mostramos un mensaje diciendo que no existe
            if (!userFound) {

                // Si el usuario no existe, mostrar un mensaje diciendo que no existe
                console.log('El usuario no existe');
                return res.status(400).json({message: 'El usuario no existe'});
                
            }
            else if (!coincidencia) {
                
                console.log('Contraseña incorrecta! Intentelo de nuevo.');
                return res.status(400).json({message: 'Contraseña incorrecta! Intentelo de nuevo.'});
            
            }

            else{
                    
                //JWT
                //Usamos la función createAccessToken que hemos importado para generar el token y la guardamos en una constante token
                const token = await createAccessToken({id: userFound._id});
                

                //En vez de enviar el token al cliente (mala práctica), lo guardamos en una cookie
                //Cookie que guarda el token de sesión
                res.cookie('token', token,
                    //Configuramos la cookie para que se envíe en solicitudes de sitios cruzados y no solo en solicitudes del mismo sitio
                    //Esto es para que la cookie sea accesible desde cualquier sitio aunque no sea el mismo sitio que la generó
                    //Configuramos la cookie para que solo se envíe por HTTPS y no por HTTP y aparte que 
                    //Esto es para que la cookie sea segura y no pueda ser interceptada por un atacante
                    {
                        samesite: 'none',
                        secure: true,
                        httpOnly: true,
                });

                //Imprimimos el token en la consola
                console.log('Token generado: ', token);
                console.log('Usuario Logueado con éxito!');

                // Imprimimos el nuevo usuario en la consola
                res.status(200).json({
                    message : "Usuario Logueado con éxito!",
                    userdata: {
                    _id: userFound._id,
                    user: userFound.user,
                    email: userFound.email,
                    //passhash: userFound.password,
                    createdAt: userFound.createdAt,
                    updateAt: userFound.updateAt,
                    //headers: req.headers
                    },
                });

                //Imprimimos el usuario guardado en la consola
                //En vez de llamar a userSaved directamente, 
                //lo convertimos a un objeto JSON con JSON.stringify 
                //y mostramos solo los campos que nos interesan
                console.log(JSON.stringify({
                    message : "Usuario Logueado con éxito!",
                    userdata:
                    {
                        _id: userFound._id,
                        user: userFound.user,
                        email: userFound.email,
                        //passhash: userFound.password,
                        createdAt: userFound.createdAt,
                        updateAt: userFound.updateAt
                    }
                }, null, 2));

            }
      

    }catch(error){
        
        if(res.status(500)){

        //Si hay un error, lo imprimimos en la consola
        console.log("Error al loguear el usuario!", error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });

        }
    
    } 

}

export const verifyToken = async (req, res) => {

    //Obtenemos el token de las cookies
    const { token } = req.cookies;

    //Si no hay token, mostramos un mensaje de error
    if (!token) {
        console.log('No hay token');
        return res.status(401).json({errorMessage: 'No Autorizado'});
    }

    //JWT
    //Verificamos el token con el método verify de jwt
    jwt.verify(token, TOKEN_SECRET, (err, user) => {

        if(err){
            //Si hay un error, mostramos un mensaje de error y un código de estado 401 con el mensaje "No Autorizado"
            console.log('Error 401: No Autorizado');
            return res.status(401).json({errorMessage: 'No Autorizado'});
        }

        //Declaramos la constante userFound que contendrá el usuario encontrado con el método findById de mongoose
        const userfound = User.findById(user.id);

        //Si el usuario no ha sido encontrado o no existe, mostramos un mensaje de error
        if (!userfound) {
            console.log('Usuario no encontrado o no existe');
            return res.status(404).json({message: 'Usuario no encontrado o no existe'});
        }

        //Si el usuario existe, mostrar un mensaje "Perfil de usuario"
        console.log("Perfil de usuario!");
        isAuthenticated = true;
        return res.status(200).json({message: "Perfil de usuario", id:userfound.id, user: userfound.user, email: userfound.email});

        }
    );

}

export const profile = async (req, res) => {
    
    
    
    // Buscamos el usuario en la base de datos con el método findById de mongoose
    const userFound = await User.findById(req.user.id);
    
    // Si el usuario no ha sido encontrado o no existe, mostramos un mensaje de error
    if (!userFound) {
        console.log('Usuario no encontrado o no existe');
        return res.status(404).json({message: 'Usuario no encontrado o no existe'});
    }
        // Si el usuario existe, mostrar un mensaje "Perfil de usuario"
        console.log("Perfil de usuario!");
        
        //Obtenemos los headers de la petición y los guardamos en una constante token
        const cookies = req.headers.cookie;
        
        //Mostramos el token en la consola
        console.log(cookies);
    
        //Imprimimos el usuario encontrado en la consola
        console.log(JSON.stringify({
            message: "Perfil de usuario",
            userdata: {
            _id: userFound._id,
            user: userFound.user,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updateAt
            }
        }, null, 2));

        return res.status(200).json({
            message: "Perfil de usuario",
            userdata: {
            _id: userFound._id,
            user: userFound.user,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updateAt
            }
        }); 
        
    
    
}

export const logout = async (req, res) => {

    //JWT
    //Eliminamos la cookie token
    //La cookie token se elimina asignando un valor vacío y un tiempo de vida de 1 milisegundo
    res.cookie('token', '', {
        maxAge: 1
    });
    
    res.status(200).json({message: 'Usuario deslogueado con éxito!'});
    console.log('Usuario deslogueado con éxito!');

}
