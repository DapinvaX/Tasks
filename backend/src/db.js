import mongoose from "mongoose";

//Funcion para conectar a la base de datos

const cnx = async () => {
    
        const password = process.env.MONGO_PASSWORD;
        //Conectamos a la base de datos
        await mongoose.connect(`mongodb+srv://dapinvax:${password}@cluster0.rksw4bm.mongodb.net/Tasks?retryWrites=true&w=majority&appName=Cluster0`)
            .then(() => console.log("¡Conectado a la base de datos de MongoDB Atlas!"))
            .catch((err) => console.error("Error al conectar con la base de datos de MongoDB Atlas: \n" + err));

    
}

export default cnx;
