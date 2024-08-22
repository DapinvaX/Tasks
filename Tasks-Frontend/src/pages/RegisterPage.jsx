import { useForm } from "react-hook-form";
import { next } from '../../../node_modules/sucrase/dist/esm/parser/tokenizer/index';

function RegisterPage() {
  

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
        className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form"
        onSubmit={handleSubmit(onSubmit)}
    >
        {/* Rest of the form */}
    </form>

    return (
    
        <div>
            <form
            id="registerForm"
            className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form" 
            onSubmit={handleSubmit(
                
                    //Función que se ejecuta al enviar el formulario
                (values)=>{
                    
                    //Muestra los valores enviados en el formulario por consola
                    console.log(values);
                    
                    }

                )}
                >

                <h1>Register</h1>

                <input id="userInput" type="text" placeholder="Usuario" {...register("username", {required:true})} />
                <br />
                <input id="emailInput" type="email" placeholder="Correo electrónico" {...register("email", {required:true})} />
                <br />
                <input id="passwordInput" type="password" placeholder="Contraseña" {...register("password", {required:true})} />
                <br />
                <input id="confirmPasswordInput" type="password" placeholder="Confirmar contraseña" {...register("confirmPassword", {required:true})} /><br />

                <button type="submit">Registrarse</button>


            </form>
        </div>

  )
}

export default RegisterPage;