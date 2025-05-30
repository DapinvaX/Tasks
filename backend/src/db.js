import mongoose from "mongoose";

//Funcion para conectar a la base de datos

const cnx = async () => {

        // Verificamos si la variable de entorno MONGO_PASSWORD está definida
        if (!process.env.MONGO_PASSWORD) {
            console.error("Error: MONGO_PASSWORD no está definida en las variables de entorno.");
            return;
        }

        //const password = "DapinvaX77MongoDB";

        // Obtenemos la contraseña de la base de datos desde las variables de entorno
        // Asegúrate de que la variable de entorno MONGO_PASSWORD esté configurada correctamente
        const password = process.env.MONGO_PASSWORD;
        
        //Conectamos a la base de datos
        await mongoose.connect(`mongodb+srv://dapinvax:${password}@cluster0.rksw4bm.mongodb.net/Tasks?retryWrites=true&w=majority&appName=Cluster0`)
            .then(() => console.log("¡Conectado a la base de datos de MongoDB Atlas!"))
            .catch((err) => console.error("Error al conectar con la base de datos de MongoDB Atlas: \n" + err));

    
}

export default cnx;
