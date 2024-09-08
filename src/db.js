import mongoose from "mongoose";

//Funcion para conectar a la base de datos

const cnx = async () => {
    try{

        //Conectamos a la base de datos
        await mongoose.connect("mongodb://localhost:27017/taskdb");
        console.log("Conectado a la base de datos");

    }catch(error){
        console.log("Error al conectar a la base de datos", error);
    }
}

export default cnx;