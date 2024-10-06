// eslint-disable-next-line no-unused-vars
import React from 'react';


import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';

import bcrypt from 'bcryptjs';

import { registerReq } from '../API/auth.js';


import { Button } from '@nextui-org/react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// CSS personalizado para el toast
const customToastStyle = `
.custom-toast {
position: top-center !important;

background-color: #4caf50 !important;
color: white !important;
font-size: 16px !important;
}

.custom-toast-error {
position: top-center !important;
background-color: #f44336 !important;
color: white !important;
font-size: 16px !important;
}

`;

// Añadir el estilo personalizado al documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customToastStyle;
document.head.appendChild(styleSheet);


function RegisterPage() {
  

    //console.log('RegisterPage');
    
    //Se crea una constante que almacena el hook useForm con el método register, handleSubmit y formState
    const { register,handleSubmit, formState: { errors } } = useForm();

    
    //Función que se ejecuta al enviar el formulario
    const onSubmit = handleSubmit(async (user) =>{
        
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
                
                    //Lanzamos un toast de éxito antes de redirigir al usuario a la página de login
                    toast.success("Usuario registrado con éxito", {
                        
                        position: "top-center",
                        autoClose: 2000, // Duración en milisegundos
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: 'custom-toast', // Clase CSS personalizada

                    });
                    
                }


            
                console.log("Datos: "+response.data)

                //Limpiar los campos de los inputs si el registro fue exitoso
                document.getElementById("userInput").value = "";
                document.getElementById("emailInput").value = "";
                document.getElementById("passwordInput").value = "";
                document.getElementById("confirmPasswordInput").value = "";
                

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
                    //window.alert("El usuario ya existe").setTimeout(3000);
                
                    toast.error("El usuario ya existe", {
                        position: "top-center",
                        autoClose: 2000, // Duración en milisegundos
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: 'custom-toast-error', // Clase CSS personalizada

                    });
                }
                else{
                    toast.error("Error al registrar! Intentelo de nuevo.", {
                        position: "top-center",
                        autoClose: 2000, // Duración en milisegundos
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: 'custom-toast-error', // Clase CSS personalizada
                    });
                }


                
                    
                    //Limpiar los campos de los inputs si el registro fue exitoso
                    document.getElementById("userInput").value = "";
                    document.getElementById("emailInput").value = "";
                    document.getElementById("passwordInput").value = "";
                    document.getElementById("confirmPasswordInput").value = "";

                    }
                
            
    });

   //LLamamos a la función useNavigate para redirigir al usuario a la página de login 
   useNavigate("/login");

   
    //Se llama a la función registerReq
     const res = registerReq();
     console.log(res);


     
    
    //Se crea un formulario con un id "registerForm" que tendrá un input para el usuario, otro para el correo electrónico, otro para la contraseña y otro para confirmar la contraseña
    return (
        <div>
            <form
                id="registerForm"
                className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form" 
                onSubmit={onSubmit}

        >
                <h1>Registro</h1>

                <input 
                    id="userInput" 
                    type="text" 
                    placeholder="Usuario" 
                    {...register("user", {  required: "Debe ingresar un nombre de usuario.", pattern: { value: /^[a-zA-Z0-9._-]{3,10}$/, message: "El nombre de usuario debe tener entre 3 y 20 caracteres." } })} 
                />
                {errors.user && <small>{errors.user.message}</small>}
                <br />

                <input 
                    id="emailInput" 
                    type="email" 
                    placeholder="Correo electrónico" 
                    {...register("email", { required: "Debe ingresar un correo electrónico", pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, message: "Ingrese un correo electrónico válido." } })} 
                />
                {errors.email && <small>{errors.email.message}</small>}
                <br />

                <input 
                    id="passwordInput" 
                    type="password" 
                    placeholder="Contraseña" 
                    {...register("password", { required: "Ingrese su contraseña.", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número." } })} 
                />
                {errors.password && <small>{errors.password.message}</small>}
                <br />

                <input 
                    id="confirmPasswordInput" 
                    type="password" 
                    placeholder="Confirmar contraseña" 
                    {...register("confirmPassword", { required: "Ingrese su contraseña nuevamente.", validate: value => value === document.getElementById("passwordInput").value || "Las contraseñas no coinciden."})} 
                />
                {errors.confirmPassword && <small>{errors.confirmPassword.message}</small>}
                <br />

                <Button type="submit" className="btnPrincipal">Registrar</Button>
                <Link to="/login">
                   Volver a Iniciar Sesión
                </Link>
            </form>
            <ToastContainer />

        </div>
        
    );
}

export default RegisterPage;