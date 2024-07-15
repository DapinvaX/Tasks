//Importamos el modelo User
import User from '../models/user.model.js';

//Importamos el modulo bcrypt para encriptar las contraseñas
import bcrypt from 'bcryptjs';

//Importamos el módulo jsonwebtoken para generar tokens
import jwt from 'jsonwebtoken';

//Exportamos las funciones de registro y login

//Función para registrar un usuario
//Recibe un request y un response
//El request contiene los datos del usuario que se envían desde el cliente
//El response es la respuesta que se envía al cliente
//La función es asincrona, por lo que utilizamos async
export const register = async (req, res) => {
   
    //res.send('Registro');
    //console.log(req.body);

   

    //Creamos un bloque try-catch para manejar los errores que puedan surgir a la hora de registrar un usuario
    try{
         //Aquí hacemos la lógica de registro

          //Extraemos los datos del usuario, email y password del request body
    const {
        user, 
        email, 
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
        const existingUser = await User.findOne({ email }) || await User.findOne({ user });

        if (existingUser) {
            
            // Si el usuario ya existe, mostrar un mensaje diciendo que ya existe
            res.send('El usuario ya existe');
            console.log('El usuario ya existe');
            
        } else {
            
            // Guardamos el usuario en la base de datos con el método save
            // Al ser una función asincrona, utilizamos await para esperar a que cuando le llegue la respuesta, se guarde en la base de datos.
            // Creamos una constante userSaved para guardar el usuario guardado
            const userSaved = await newUser.save();

            // Generamos un token con el método sign de jwt
            // El método sign recibe un objeto con los datos que queremos guardar en el token
            // En este caso guardamos solo el id
            // MySecretKeyDPX es la clave secreta que utilizamos para firmar el token
            jwt.sign({
                id: userSaved._id,
                //Clave secreta   Tiempo de expiración del token
            } , 'MySecretKeyDPX', {expiresIn: 3600}, (err, token) => {
                // Si hay un error, lanzamos una excepción
                if(err) throw err;
                res.json({ token });
            });

            // Imprimimos el nuevo usuario en la consola
            //console.log(userSaved);

            // Enviamos una respuesta al cliente con los datos del usuario guardado
            //Imprimimos el usuario guardado en la consola (ahora sin la contraseña)
            //createdAt es un método de mongoose que nos da la fecha de creación del usuario
            res.status(200).json({
                _id: userSaved._id,
                user: userSaved.user,
                email: userSaved.email,
                //passhash: userSaved.password,
                createdAt: userSaved.createdAt,
                updateAt: userSaved.updateAt
            });
                
            console.log("Usuario registrado");

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
        
        /* if(res.status(500)){

        //Si hay un error, lo imprimimos en la consola
        console.log("Error al registrar el usuario", error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });

        } */
        
        opt = res.status();

        //Filtramos los errores por el código de estado de respuesta erróneo
        switch(opt){
            case opt >= 400 && opt < 500:
                console.log("Error al registrar el usuario", error);
                res.status(400).json({ mensaje: 'Error de solicitud del cliente.' });
                break;
            case opt >= 500 && opt < 600:
                console.log("Error al registrar el usuario", error);
                res.status(500).json({ mensaje: 'Error interno del servidor' });
                break;
            default:
                console.log("Error desconocido");
                break;
        }
    
    }
}

export const login = (req, res) => {
    //Aquí hacemos la lógica de login
    
    //res.send('Login');
    //console.log(req.body);

    const {user, password} = req.body;

}