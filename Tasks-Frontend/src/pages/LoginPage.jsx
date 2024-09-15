//Importamos el hook useForm
import { useForm } from "react-hook-form";

//Importamos el componente Link y useNavigate de React Router Dom para manejar la navegación y redirecciones.
import { Link, useNavigate } from "react-router-dom";


//Importamos el componente Button de NextUI
import { Button } from "@nextui-org/react";


//Importamos la librería de Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//Importamos la función loginReq desde la API de autenticación
import { loginReq } from "../API/auth.js";


    // CSS personalizado para el toast
    const customToastStyle = `
    .custom-toast {
    background-color: #4caf50 !important;
    color: white !important;
    font-size: 16px !important;
    }
    `;

    // Añadir el estilo personalizado al documento
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customToastStyle;
    document.head.appendChild(styleSheet);


function LoginPage() {
  console.log("LoginPage");


    //Se crea una constante que almacena el hook useForm
    const { register, handleSubmit, formState: { errors } } = useForm();

    //Se crea una constante que almacena la función navigate
    const navigate = useNavigate();

    //Se crea un formulario con un id "registerForm" que tendrá un input para el usuario y otro para la contraseña
    return (
        <div>
            <form
                    id="loginForm"
                    className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form" 
                    onSubmit={handleSubmit(async (user) =>{
                    try{
                        console.log(user);

                        //Se llama a la función loginReq con el objeto user como parámetro.
                        //Esta función se encarga de realizar la petición de logueo al servidor.
                        const res = await loginReq(user);

                        //Se muestra en la consola la respuesta del servidor.
                        console.log(res);

                        // Mostrar toast de éxito
                        // Mostrar toast de éxito con opciones personalizadas
                        toast.success("Login exitoso!", {
                            position: "top-right",
                            autoClose: 2000, // Duración en milisegundos
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            className: 'custom-toast', // Clase CSS personalizada
                        });
                        
                        //Redirigir al usuario a la página de tareas
                        navigate('/profile');
    0    
                        //Si el login es exitoso, se redirige al usuario a la página de tareas.
                        //console.log(res);"{\"hello\":\"world\"}"

                        //Limpiar los campos de los inputs si el login fue exitoso
                        //document.getElementById("userInput").value = "";
                        //document.getElementById("passwordInput").value = "";
                                                
                        
                    }catch{

                        //Si la contraseña es incorrecta, mostrará un mensaje de error en la consola y en la ventana.

                            console.error("Usuario o contraseña incorrectos. Inténtelo de nuevo.");
                            //window.alert("Usuario o contraseña incorrectos. Inténtelo de nuevo.");

                            toast.error("Error al loguear! Intentelo de nuevo.", {
                                position: "bottom-center",
                                autoClose: 2000, // Duración en milisegundos
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                className: 'custom-toast-error', // Clase CSS personalizada
                            });
                            
                            //Limpiar los campos de los inputs si el login fue exitoso
                            document.getElementById("userInput").value = "";
                            document.getElementById("passwordInput").value = "";

                            return;

                    }
                    }
                )
            }
            
            >
                    <h1>Login</h1>
                    <input 
                        id="userInput" 
                        type="text" 
                        placeholder="Usuario" 
                        {...register("user", { required: "Debe ingresar un nombre de usuario." })} 
                    />
                    {errors.user && <small>{errors.user.message}</small>}
                    <br />

                    <input 
                        id="passwordInput" 
                        type="password" 
                        placeholder="Contraseña" 
                        //Se llama a la función register con el nombre del input y un objeto con la propiedad required.
                        //Esta propiedad es un mensaje que se mostrará si el usuario no introduce una contraseña.
                        {...register("password", { required: "Debe ingresar una contraseña." })}
                        
                    />
                    {errors.password && <small>{errors.password.message}</small>}
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


                    
                   
                    
                    
