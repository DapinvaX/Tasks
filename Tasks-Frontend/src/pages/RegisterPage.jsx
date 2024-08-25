
import { useForm } from "react-hook-form";


import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  

    console.log('RegisterPage');
    
    //Se crea una constante que almacena el hook useForm
    const { register, handleSubmit } = useForm();
    
    const onSubmit = (values) => {
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

        console.log("Las contraseñas coinciden");
        // Continuar con el registro
        fetch('http://localhost:4000/api/register', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('¡El usuario ha sido registrado satisfactoriamente!', data);
                window.alert("¡El usuario ha sido registrado satisfactoriamente!");
                console.log(values);
               
            })
            .catch(error => {
                console.error('Registration failed', error);
                window.alert("El usuario no ha sido registrado. Intente nuevamente.");
                           
            });

        console.log(values);
    };

    // ...

    

    return (
        <div>
            <form
                id="registerForm"
                className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1>Registro</h1>

                <input id="userInput" type="text" placeholder="Usuario" {...register("user", {required:true})} /><br />
                <input id="emailInput" type="email" placeholder="Correo electrónico" {...register("email", {required:true})} /><br />
                <input id="passwordInput" type="password" placeholder="Contraseña" {...register("password", {required:true})} /><br />
                <input id="confirmPasswordInput" type="password" placeholder="Confirmar contraseña" {...register("confirmPassword", {required:true})} /><br />

                <Button type="submit" className="btnPrincipal">Registrar</Button>
                <Link to="/login">
                   Volver a Iniciar Sesión
                </Link>
            </form>
        </div>
    );
}

export default RegisterPage;