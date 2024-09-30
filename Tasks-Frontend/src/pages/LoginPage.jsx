//Importamos el hook useEffect y useState de React para manejar el ciclo de vida de los componentes y el estado de los mismos.
import { useEffect, useState } from 'react';

//Importamos el hook useForm
import { useForm } from "react-hook-form";

//Importamos el componente Link y useNavigate de React Router Dom para manejar la navegación y redirecciones.
import { Link, useNavigate } from "react-router-dom";

//Importamos el hook useAuthProfile desde el contexto de autenticación
import { useAuthProfile } from "../context/AuthContextProfile.jsx";

//Importamos la función loginReq desde la API de autenticación
import { loginReq } from "../API/auth.js";

//Importamos el componente Button de NextUI
import { Button } from "@nextui-org/react";

//Importamos la librería de Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//Importamos la función loginReq desde la API de autenticación
//import { loginReq } from "../API/auth.js";



    // CSS personalizado para el toast
    const customToastStyle = `
    .custom-toast {
    background-color: #4caf50 !important;
    color: white !important;
    font-size: 16px !important;
    }

    .custom-toast-error {
    background-color: #f44336 !important;
    color: white !important;
    font-size: 16px !important;
    }import AddTaskPage from './AddTaskPage';

    `;

    // Añadir el estilo personalizado al documento
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customToastStyle;
    document.head.appendChild(styleSheet);


function LoginPage() {
    //console.log("LoginPage");

    //Se crea una constante que almacena el hook useForm
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // Estado local para almacenar el mensaje de error de la contraseña
    const [userError, setUserError] = useState("");

    // Estado local para almacenar el mensaje de error de la contraseña
    const [passwordError, setPasswordError] = useState("");

    //Se crea una constante que almacena el valor del input del usuario y de la contraseña con el hook watch
    //El hook watch permite observar los cambios en los inputs del formulario
    const userValue = watch("user");
    const passwordValue = watch("password");

    //Se crea una constante que almacena el hook useAuthProfile
    const { loguear, isAuthenticated } = useAuthProfile();

    //Se crea una constante que almacena el hook useNavigate
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (user) => {
            try { 
                

                const res = await loginReq(user);
                console.log(res);

               
                const loged = loguear(user);
                console.log(loged);

                //document.getElementById("loginForm").reset();
    
            }
            catch(errors){
                
                console.error(errors);
                
                const res = errors.response;

                if(res.status === 501)
                    
                    return toast.error('El usuario no existe.', {
                        className: 'custom-toast-error',
                    });
                    

                if(res.status === 505)
                    return toast.error('La contraseña es incorrecta.', {
                        className: 'custom-toast-error',
                    });

                    return res.status === 500 && toast.error('Error interno del servidor.', {
                        className: 'custom-toast-error',
                    });
            }   
            
        }       
    );
    
    //Validación del usuario
    const validateUser = (userValue) => {
        
        if (!/.{1,}/.test(userValue)) {
            return true; // No mostrar otros mensajes de error si la longitud es menor a 1
        }
        if (!/.{3,}/.test(userValue)) {
            //Se pone 2 porque el 3 tambíén cuenta
            return "El usuario debe tener al menos 3 caracteres.";
        }
        if (!/^[a-zA-Z0-9]*$/.test(userValue)) {
            return "El usuario no puede contener caracteres especiales ni espacios.";
        }

        return true;
    };

    //Validción de la contraseña
    const validatePassword = (passwordValue) => {
        
        if (!/.{1,}/.test(passwordValue)) {
            return true; // No mostrar otros mensajes de error si la longitud es menor a 1
        }
        if (!/.{8,}/.test(passwordValue)) {
            return "La contraseña debe tener al menos 8 caracteres.";
        }
        if (!/.[a-z]/.test(passwordValue)) {
            return "La contraseña debe incluir al menos una letra minúscula.";
        }
        if (!/[A-Z]/.test(passwordValue)) {
            return "La contraseña debe incluir al menos una letra mayúscula.";
        }
        if (!/\d/.test(passwordValue)) {
            return "La contraseña debe incluir al menos un número.";
        }

        return true;
    };

     // useEffect para validar el usuario cada vez que cambie
     useEffect(() => {
        const error = validateUser(userValue);
        if (error !== true) {
            setUserError(error);
        } else {
            setUserError("");
        }
    }, [userValue]);

    // useEffect para validar la contraseña cada vez que cambie
    useEffect(() => {
        const error = validatePassword(passwordValue);
        if (error !== true) {
            setPasswordError(error);
        } else {
            setPasswordError("");
        }
    }, [passwordValue]);

    useEffect(() => {

        if(isAuthenticated)
            return navigate('/profile');

    },[isAuthenticated, navigate]);



    //Se crea un formulario con un id "registerForm" que tendrá un input para el usuario y otro para la contraseña
    return (
        <div>
            <form
                    id="loginForm"
                    className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form" 
                    onSubmit = {onSubmit}
            
            >
                    <h1>Login</h1>
                    <input 
                        id="userInput" 
                        type="text" 
                        placeholder="Usuario" 
                        {...register("user", { 
                            required: "Debe ingresar un nombre de usuario o email.",
                            validate: validateUser
                        }
                    )
                }

                    />
                    {errors.user && <small> {errors.user.message} </small>}
                    {userError && <small>{userError}</small>}
                    
                    <br />

                    <input 
                        id="passwordInput" 
                        type="password" 
                        placeholder="Contraseña" 
                        //Se llama a la función register con el nombre del input y un objeto con la propiedad required.
                        //Esta propiedad es un mensaje que se mostrará si el usuario no introduce una contraseña.
                        {...register("password", { 
                            required: "Debe ingresar una contraseña.",
                            minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres." },
                            validate: validatePassword
                        })}
                    />
                        {errors.password && <small>{errors.password.message}</small>}
                        {passwordError && <small>{passwordError}</small>}
                    <br />

                    <Button type="submit" className="btnPrincipal">Iniciar Sesión</Button>
                    <Link to="/register">
                    ¿No está registrado?<br />
                        Regístrese aquí.
                    </Link>
                </form>
                <ToastContainer />

            </div>
    
        );
    }

export default LoginPage;


                    
                   
                    
                    
