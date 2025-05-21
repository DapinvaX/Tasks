import mongoose from "mongoose";

//Funcion para conectar a la base de datos

const cnx = async () => {
    

        //Conectamos a la base de datos
        await mongoose.connect("mongodb://localhost:27017/taskdb")
            .then(() => console.log("¡Conectado a la base de datos! (MongoDB Local)"))
            .catch((err) => console.error("Error al conectar con la base de datos de (MongoDB Local): \n" + err));

    
}

export default cnx;