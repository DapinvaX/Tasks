//Importamos el hook useForm
//import { useForm } from "react-hook-form";

import { Button } from "@nextui-org/react";

import { Link } from "react-router-dom";

function LoginPage() {
  console.log("LoginPage");

  //Se crea una constante que almacena el hook useForm

return (
    <div>
        <form
            id="loginForm"
            className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form"
        >
            <h1>Login</h1>
            <input id="userInput" type="text" placeholder="Usuario" />
            <br />
            <input id="passwordInput" type="password" placeholder="Contraseña" />
            <br />
            <button type="submit">Iniciar Sesión</button>
            <a href="/register">¿No estás registrado? <br/>Regstrate.</a>
            <Link to="/">
                <Button class="btnSecund">Atrás</Button>
            </Link>
        </form>
    </div>
);
}

export default LoginPage;
