//Importamos el hook useForm
import { useForm } from "react-hook-form";

import { next } from '../../../node_modules/sucrase/dist/esm/parser/tokenizer/index';

import { Button } from '@nextui-org/react';

import { Link } from 'react-router-dom';

function LoginPage() {



    console.log('RegisterPage');
    
    //Se crea una constante que almacena el hook useForm
    const { register, handleSubmit } = useForm();
    
    const onSubmit = (values) => {
        const pass = values.password;
        const confirmPass = values.confirmPassword;

        if (pass !== confirmPass) {
            console.error("Las contraseñas no coinciden");

            // Mostrar error de que las contraseñas no coinciden
            return;
        }

        console.log("Las contraseñas coinciden");
        // Continuar con el registro
        next();
    };

    // ...

    <form
        id="registerForm"
        className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md formLogin"
        onSubmit={handleSubmit(onSubmit)}
    >
        {/* Resto del form */}
    </form>

    return (
        <div>
            <form
                id="loginForm"
                className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form" 
                onSubmit={handleSubmit((values) => {
                    console.log(values);
                })}
            >
                <h1>Login</h1>
                <input id="userInput" type="text" placeholder="Usuario" {...register("username", {required:true})} />
                <br />
                <input id="passwordInput" type="password" placeholder="Contraseña" {...register("password", {required:true})} />
                <br />
                <button type="submit">Iniciar Sesión</button>
                <Button as={Link} to="/register" variant="primary">Registrar</Button>
                
            </form>
        </div>
    )

    
}

export default LoginPage;