
import { useForm } from "react-hook-form";


import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

import { registerReq } from '../API/auth.js';



function RegisterPage() {
  

    console.log('RegisterPage');
    
    const { register,handleSubmit, formState: { errors } } = useForm();

    
    
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
                    const res = await registerReq(values);

                    //Muestra en la consola la respuesta del backend
                    console.log(res);

                    //Si la respuesta del backend es exitosa, mostrará un mensaje de éxito en la consola y en la ventana.
                    if (res.status === 200) {
                        console.log("Usuario registrado con éxito!");
                        window.alert("Usuario registrado con éxito!");
                    }

                    if(res.status === 405){
                        console.error("El usuario ya existe");
                        window.alert("El usuario ya existe");
                        return;
                    }

                    console.log("Datos: "+res.data)
                    


                }
            )
        }

        >
                <h1>Registro</h1>

                <input 
                    id="userInput" 
                    type="text" 
                    placeholder="Usuario" 
                    {...register("user", {  required: true, message: "Debe ingresar un nombre de usuario.", pattern: { value: /^[a-zA-Z0-9._-]{3,20}$/, message: "El nombre de usuario debe tener entre 3 y 20 caracteres." } })} 
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
                    {...register("password", { required: true, message: "Ingrese su contraseña.", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número." } })} 
                />
                {errors.password && <small>{errors.password.message}</small>}
                <br />

                <input 
                    id="confirmPasswordInput" 
                    type="password" 
                    placeholder="Confirmar contraseña" 
                    {...register("confirmPassword", { required: true, message: "Ingrese su contraseña nuevamente.", validate: value => value === document.getElementById("passwordInput").value || "Las contraseñas no coinciden."})} 
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