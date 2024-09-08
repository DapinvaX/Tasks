//Importamos el hook useForm
import { useEffect, useState } from "react"; // Import the useState hook

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button } from "@nextui-org/react";

import { loginReq, verifyTokenReq } from "../API/auth.js";

function LoginPage() {
  console.log("LoginPage");

  //Se crea una constante que almacena el hook useForm
  const {register, handleSubmit, formState: { errors } } = useForm();

  const [ setIsAuthenticated ] = useState(false);

  //Declara una constante navigate que almacena la función useNavigate
  const navigate = useNavigate();


    useEffect(() => {
    
        console.log("LoginPage");

        //Se llama a la función verifyTokenReq para verificar si el token es válido
        verifyTokenReq().then((res) => {
            console.log(res.data);
            //Si la respuesta contiene datos, el usuario está autenticado
            if(res.data){

                //Se establece el estado de autenticación en verdadero
                setIsAuthenticated(true);
            }
            //Si no hay datos en la respuesta, el usuario no está autenticado
            setIsAuthenticated(false);

        }).catch((errors) => {
            console.error(errors);
            //Si hay errores, el usuario no está autenticado
            setIsAuthenticated(false);
        
    });
        
    }, [
        setIsAuthenticated
    ]);


  //Se crea un formulario con un id "registerForm" que tendrá un input para el usuario y otro para la contraseña
  return (
    <div>
        <form
                id="registerForm"
                className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form" 
                onSubmit={handleSubmit(async (user) =>{
                   try{
                    console.log(user);
                    const res = await loginReq(user);
                    console.log(res);
                    loginReq(user).then((res) => {
                        

                        //Si la respuesta de axios es exitosa, mostrará un mensaje de éxito en la consola y en la ventana.

                            console.log("Usuario Logueado con éxito!");
                            window.alert("Usuario Logueado con éxito!");
                            
                            //Muestra en la consola la respuesta del backend
                            console.log("Datos: "+res.data)

                            //Si el login fue exitoso, se redirigirá al usuario a su perfil
                            navigate("/profile");

                            //Limpiar los campos de los inputs si el login fue exitoso
                            document.getElementById("userInput").value = "";
                            document.getElementById("passwordInput").value = "";
                        }
                    );

                }
                   catch{

                       //Si la contraseña es incorrecta, mostrará un mensaje de error en la consola y en la ventana.

                        console.error("Usuario o contraseña incorrectos. Inténtelo de nuevo.");
                        window.alert("Usuario o contraseña incorrectos. Inténtelo de nuevo.");
                        
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
    </div>
  );
}

export default LoginPage;
