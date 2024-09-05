
import { useForm } from "react-hook-form";


import { Button } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';

import { registerReq } from '../API/auth.js';



function RegisterPage() {
  

    console.log('RegisterPage');
    
    //Se crea una constante que almacena el hook useForm con el método register, handleSubmit y formState
    const { register,handleSubmit, formState: { errors } } = useForm();
    
    //Declara una constante navigate que almacena la función useNavigate
    const navigate = useNavigate();

    
    
    return (
        <div>
            <form
                id="registerForm"
                className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form" 
                onSubmit={handleSubmit(async (values) =>{
        
                    //console.log(values);
                    

                    //Si las contraseñas son iguales, se procede a registrar al usuario
                    
                    //Se llama a la función registerReq con los valores de los inputs
                    //Esto se hace para enviar los datos al backend 
                    //y registrar al usuario introduciendolo en la base de datos de datos de MongoDB
                    const response = await registerReq(values);

                    //Muestra en la consola la respuesta del backend
                    console.log(response);

                    //Si la respuesta de axios es exitosa, mostrará un mensaje de éxito en la consola y en la ventana.
                    if(response.headers === "Usuario registrado con éxito"){
                        console.log("Usuario registrado con éxito");
                        window.alert("Usuario registrado con éxito").setTimeout(3000);

                        //var w = window.open('','','width=100,height=100')
                        //w.document.write('Usuario registrado con exito!')
                        //w.focus()
                        //setTimeout(function() {w.close();}, 2000) 
                        }


                    //Si el usuario ya existe, mostrará un mensaje de error en la consola y en la ventana.
                    if(response.message === "El usuario ya existe"){
                        console.error("El usuario ya existe");
                        window.alert("El usuario ya existe").setTimeout(3000);
                        
                    }

                    console.log("Datos: "+response.data)
                    
                   

                    document.getElementById("userInput").value = "";
                    document.getElementById("emailInput").value = "";
                    document.getElementById("passwordInput").value = "";
                    document.getElementById("confirmPasswordInput").value = "";
  
                    //Redirigir al login
                    navigate("/login"); 

                    
                }
            )
        }

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
        </div>
    );
}

export default RegisterPage;