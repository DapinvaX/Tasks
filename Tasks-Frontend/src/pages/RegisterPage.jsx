
import { useForm } from "react-hook-form";


import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { registerReq } from './../API/auth.js';


function RegisterPage() {
  

    console.log('RegisterPage');
    
    //Se crea una constante que almacena el hook useForm
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    

    // ...

    

    return (
        <div>
            <form
                id="registerForm"
                className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form" 
                onSubmit={handleSubmit(async (values) =>{
                   try{
                    console.log(values);
                    const res = await registerReq(values);
                    console.log(res);
                    registerReq(values).then((res) => {
                        
                            //Recuperar los valores de los campos (password y confirmPassword)
                            const pass = values.password;
                            const confirmPass = values.confirmPassword;

                            // Verificar si las contraseñas coinciden
                            if (pass !== confirmPass) {
                                console.error("Las contraseñas no coinciden");
                                window.alert("Las contraseñas no coinciden");
                                // Mostrar error de que las contraseñas no coinciden
                                return;
                            }
                            console.log("Datos: "+res.data)

                            //Limpiar los campos de los inputs si el registro fue exitoso
                            document.getElementById("userInput").value = "";
                            document.getElementById("emailInput").value = "";
                            document.getElementById("passwordInput").value = "";
                            document.getElementById("confirmPasswordInput").value = "";

                        }
                    );
                   }catch(err){
                       console.error(err);
                       window.alert("¡Ha ocurrido un error desconocido al registrar el usuario!");
                       
                   }
                }
            )
        }
        
        >
                <h1>Registro</h1>

                <input 
                    id="userInput" 
                    type="text" 
                    placeholder="Usuario" 
                    {...register("user", { required: "Debe ingresar un nombre de usuario" })} 
                />
                {errors.user && <small>{errors.user.message}</small>}
                <br />

                <input 
                    id="emailInput" 
                    type="email" 
                    placeholder="Correo electrónico" 
                    {...register("email", { required: "Debe ingresar un correo electrónico" })} 
                />
                {errors.email && <small>{errors.email.message}</small>}
                <br />

                <input 
                    id="passwordInput" 
                    type="password" 
                    placeholder="Contraseña" 
                    {...register("password", { required: "Debe ingresar una contraseña" })} 
                />
                {errors.password && <small>{errors.password.message}</small>}
                <br />

                <input 
                    id="confirmPasswordInput" 
                    type="password" 
                    placeholder="Confirmar contraseña" 
                    {...register("confirmPassword", { required: "Debe confirmar su contraseña" })} 
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