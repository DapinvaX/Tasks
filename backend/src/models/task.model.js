//Importamos mongoose
import mongoose from 'mongoose';

//Importamos el modelo de usuario para poder utilizarlo en el middleware
import User from './user.model.js';


//Definimos el esquema de la colección de tareas
const taskSchema = new mongoose.Schema({
    //Definimos los campos que tendrán las tareas
    
    //Título de la tarea (string, requerido)
    title: {
        type: String,
        required: true
    },

    //Descripción de la tarea (string, no requerido)
    description: {
        type: String,
        required: false
    },

     //Fecha de vencimiento de la tarea (fecha, no requerido)
    date: {
        type: Date,
        required: false
    },
    
    //Estado de la tarea (si está hecha o no) (boolean, no requerido, por defecto false)
    done: {
        type: Boolean,
        default: false,
        required: false,
    },
    
    //Usuario al que pertenece la tarea (referencia al modelo de usuarios)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },

    //Fecha de creación de la tarea (fecha, requerido)
    createDate: {
        type: Date,
        default: Date.now
    }

}, {
    //Añadimos la propiedad de timestamps
    timestamps: true
}); 

//Creamos el modelo de tareas
export default mongoose.model('Task', taskSchema);