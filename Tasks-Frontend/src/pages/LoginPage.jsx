//Importamos el hook useForm
import { useForm } from "react-hook-form";

import { Button } from "@nextui-org/react";

import { Link } from "react-router-dom";

import { loginReq } from "../API/auth.js";



function LoginPage() {
  console.log("LoginPage");

  //Se crea una constante que almacena el hook useForm
  const {register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div>
        <form
                id="registerForm"
                className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form" 
                onSubmit={handleSubmit(async (values) =>{
                   try{
                    console.log(values);
                    const res = await loginReq(values);
                    console.log(res);
                    loginReq(values).then((res) => {
                        
                            //Si el mensaje del backend es "message":"Contraseña incorrecta! Intentelo de nuevo.", mostrará un mensaje de error en la consola y en la ventana.
                            /* if (res.data.message === "Contraseña incorrecta! Intentelo de nuevo.") {
                              
                              console.error("Contraseña incorrecta! Intentelo de nuevo.");
                              window.alert("Contraseña incorrecta! Intentelo de nuevo.");
                              return;

                              } */

                            console.log("Usuario Logueado con éxito!");
                            window.alert("Usuario Logueado con éxito!");
                            
                            console.log("Datos: "+res.data)

                            //Limpiar los campos de los inputs si el login fue exitoso
                            document.getElementById("userInput").value = "";
                            document.getElementById("passwordInput").value = "";
                                                }
                    );
                   }catch(err){

                       /* console.error(err);
                       window.alert("¡Ha ocurrido un error desconocido al loguear!"); */
                        console.error(err);
                        console.error("Contraseña incorrecta! Intentelo de nuevo.");
                        window.alert("Contraseña incorrecta! Intentelo de nuevo.");
                        
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
