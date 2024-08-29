//Importamos el hook useForm
import { useForm } from "react-hook-form";

import { Button } from "@nextui-org/react";

import { Link } from "react-router-dom";


function LoginPage() {
  console.log("LoginPage");

  //Se crea una constante que almacena el hook useForm
  const { login, formState: { errors } } = useForm();

 

  return (
    <div>
      <form
        id="loginForm"
        className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form"
        method="POST"
      >
        <h1>Login</h1>
        <input 
                    id="userInput" 
                    type="text" 
                    placeholder="Usuario" 
                    {...login("user", { required: "Debe ingresar un nombre de usuario" })} 
                />
                {errors.user && <small>{errors.user.message}</small>}
        <br />
        <input 
          id="passwordInput" 
          type="password" 
          placeholder="Contraseña"
          {...login("password", { required: "Debe ingresar una contraseña" })}
        />
        {errors.password && <small>{errors.password.message}</small>}
        <br />
        <button type="submit">Iniciar Sesión</button>
        <Link to="/register">
          <a id="linkLog">
            ¿No estás registrado? <br />
            Regístrate.
          </a>
        </Link>
        <Link to="/">
          <Button class="btnSecund">Atrás</Button>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
