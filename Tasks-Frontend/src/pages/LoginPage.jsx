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

    const navigate = useNavigate();
    
    //Se crea una constante que almacena el valor del input del usuario y de la contraseña con el hook watch
    //El hook watch permite observar los cambios en los inputs del formulario
    const userValue = watch("user");
    const passwordValue = watch("password");

    //Se crea una constante que almacena el hook useAuthProfile
    const { loguear } = useAuthProfile();

    const onSubmit = handleSubmit(async (user) => {
            try { 
                
                
                
                //const res = await loginReq(user);

                const res = await loginReq(user);
                console.log(res);

                if (res.status === 200) {
                    
                    //LLamamos a la función loguear con los valores de los inputs
                    loguear(user);
                        
                    //Redirigimos al usuario a la página de tareas
                    navigate("/profile");

                    return;


                }

                return;
                
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
                        {...register("user", { required: "Debe ingresar un nombre de usuario o email." })} 
                    />
                    {errors.user && <small>{errors.user.message}</small> && userValue.length < 3 && <small>El usuario debe tener al menos 3 caracteres.</small>}
                    <br />

                    <input 
                        id="passwordInput" 
                        type="password" 
                        placeholder="Contraseña" 
                        //Se llama a la función register con el nombre del input y un objeto con la propiedad required.
                        //Esta propiedad es un mensaje que se mostrará si el usuario no introduce una contraseña.
                        {...register("password", { required: "Debe ingresar una contraseña." })}
                        
                    />
                    {errors.password && <small>{errors.password.message}</small> && passwordValue.length < 8 && <small>La contraseña debe tener al menos 8 caracteres.</small>}
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


                    
                   
                    
                    
