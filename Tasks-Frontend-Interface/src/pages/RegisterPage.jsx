import { useState } from 'react';
import { useForm } from "react-hook-form";

import { registerReq } from '../API/auth.js';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import bcrypt from 'bcryptjs';

export function RegisterPage() {
  
  //Se crea una constante que almacena el hook useForm con el método register, handleSubmit y formState
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useAuth();

  const onSubmit = async (user) => {

    try{
                    
                
    
                    //Ciframos la contraseña del usuario con bcrypt
                    //para almacenarla en la base de datos
    
                    //Encriptamos la contraseña con el método hash de bcrypt y su función genSaltSync para encriptar la contraseña.
                    
                    /*
                    
                    "genSaltSync()"se utiliza para generar una "sal" criptográfica de manera sincrónica. Esta función es parte de la biblioteca `bcrypt` para cifrar contraseñas y datos.
                    En el contexto de la seguridad de las contraseñas, una "sal" es un valor aleatorio que se añade a la contraseña antes de ser hasheada, es decir, es la clave aleatoria que se utilizará para hashear el dato. 
                    Esto ayuda a proteger contra ataques de diccionario y ataques de fuerza bruta, ya que incluso si dos usuarios tienen la misma contraseña, sus hashes serán diferentes debido a las diferentes sales (claves).
    
                    Luego, la linea const pashHash = bcrypt.hashSync(user.password, salt); se asigna el hash generado a la propiedad password de user. 
                    Esto se utilizará para cifrar la contraseña del usuario con la clave generada anteriormente y sustituirla por esta.
                    */
    
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(user.password, salt);
                    const passHash = hash;
    
    
                    // Crear un nuevo objeto de usuario con la contraseña cifrada
                    const userHashedPass = {
                        ...user,
                        password: passHash
                    };
    
                    //console.log("Contraseña cifrada: "+passHash);
    
                     //Se llama a la función registerReq con los valores de los inputs
                    //Esto se hace para enviar los datos al backend 
                    //y registrar al usuario introduciendolo en la base de datos de datos de MongoDB
                    const response = await registerReq(userHashedPass); 
                        //await registerReq(user);
                    //Muestra en la consola la respuesta del backend
                    console.log(response);
    
                    //Si la respuesta de axios es exitosa, mostrará un mensaje de éxito en la consola y en la ventana.
                    if(response.status === 200 ){
                        console.log("Usuario registrado con éxito");
                        //window.alert("Usuario registrado con éxito").setTimeout(3000);
    
                        //var w = window.open('','','width=100,height=100')
                        //w.document.write('Usuario registrado con exito!')
                        //w.focus()
                        //setTimeout(function() {w.close();}, 2000) 
                    
                    }
    
    
                
                    console.log("Datos: "+response.data)
    
                }catch{
    
                    //Recogemos la respuesta de axios
                    //Si hay un error, mostrará un mensaje de error en la consola
                    //y en la ventana.
                    
                    const res = registerReq(user);
                    
                    console.log(res);
    
                    //Ciframos la contraseña del usuario con bcrypt
                    //para almacenarla en la base de datos
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(user.password, salt);
                    user.password = hash;
    
                    
                        //Si hay un error al registrar, mostrará un mensaje de error en la consola y en la ventana.
                        console.error("Error al registrar. Inténtelo de nuevo.");
                        
                        //Si el usuario ya existe, mostrará un mensaje de error en la consola y en la ventana.
                    if(res.status === 505 ){
                        console.error("El usuario ya existe");
                        window.alert("El usuario ya existe").setTimeout(3000);
                    
                        
                    }
                    else{
                        console.error("Error al registrar. Inténtelo de nuevo.");
                        window.alert("Error al registrar. Inténtelo de nuevo.").setTimeout(3000);
                    }
    
                }

  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <UserPlus className="h-12 w-12 text-blue-500 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Registro
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              /* {...register("user", {  required: "Debe ingresar un nombre de usuario.", pattern: { value: /^[a-zA-Z0-9._-]{3,10}$/, message: "El nombre de usuario debe tener entre 3 y 20 caracteres." } })}  */
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
             /*  {...register("password", { required: "Ingrese su contraseña.", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número." } })} */
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
                confirmPassword && password !== confirmPassword ? 'border-red-500 dark:border-red-500' : ''
              }`}
             /*  {...register("confirmPassword", { required: "Ingrese su contraseña nuevamente.", validate: value => value === document.getElementById("passwordInput").value || "Las contraseñas no coinciden."})} */
              required
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                Las contraseñas no coinciden
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}