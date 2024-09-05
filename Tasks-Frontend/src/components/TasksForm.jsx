import { useState } from 'react';

const TasksForm = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        done: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: checked
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Aquí puedes enviar la tarea al servidor o realizar cualquier otra acción necesaria
       /*  const response = await taskReq(values);

        console.log(response); */
    };

    return (
        
        <form 
        className="bg-zinc-800 max-w-md mx-auto p-4 rounded-md shadow-md form" 
        onSubmit={handleSubmit}
        >
            <label>
                <a>Título:</a>
                <input type="text" name="titulo" value={task.title} onChange={handleChange} />
            </label>
            <br />
            <label>
                <a>Descripción:</a>
                <input id="inputDescripcion" type="text" name="description" value={task.description} onChange={handleChange} />
            </label>
            <br />
            <label>
                Hecho:
                <input type="checkbox" name="done" checked={task.done} onChange={handleCheckboxChange} />
            </label>
            <br />
            <button type="submit">Añadir/Modificar</button>
        </form>
    );
};

export default TasksForm;