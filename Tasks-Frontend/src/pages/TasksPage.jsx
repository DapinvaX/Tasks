import { useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import dayjs from "dayjs";



import { useAuthProfile } from '../context/AuthContextProfile.jsx';

import { useTaskContext } from '../context/TaskContext.jsx';




function TasksPage(){

    const { user, isAuthenticated } = useAuthProfile();

    const params = useParams();

    const { getTask, deleteTask, updateTask } = useTaskContext();

    const {
        setValue,
      } = useForm()

    useEffect(() => {
        const loadTask = async () => {
          if (params.id) {
            const task = await getTask(params.id);
            setValue("title", task.title);
            setValue("description", task.description);
            setValue(
              "date",
              task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
            );
            setValue("completed", task.completed);
          }
        };
        loadTask();
      }, [getTask, deleteTask, updateTask, setValue, params.id]);

    return(
        <div className="tasksPage">

        {isAuthenticated ? (

                        <>
                            <style>{`
                                .buttonsContainer {
                                    margin-bottom: 50px;

                                }
                            `}</style>

                            <div className="buttonsContainer">
                                <h1>Tareas de {user.user}</h1>
                                <Link to="/profile"    className="btn btn-primary btnInput">Perfil</Link>
                                <Link to="/add-task"   className="btn btn-primary btnInput">Añadir Tarea</Link>
                                <Link to="/tasks/:id"  className="btn btn-primary btnInput">Modificar Tarea</Link> {/* PROVISIONAL  */}

                            </div> 
                            <div className="tasksContainer">
                                {/* Aquí se mostrarán las tareas (Se replicará el componente TaskCard tantas veces como tareas haya, cada uno asociado a un ID de su tarea) */}
                                <Card>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        {...register("title")}
                                        autoFocus
                                        />
                                        {errors.title && (
                                        <p className="text-red-500 text-xs italic">Please enter a title.</p>
                                        )}

                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                        name="description"
                                        id="description"
                                        rows="3"
                                        placeholder="Description"
                                        {...register("description")}
                                        ></Textarea>

                                        <Label htmlFor="date">Date</Label>
                                        <Input type="date" name="date" {...register("date")} />
                                        <Button>Save</Button>
                                    </form>
                                </Card>                 
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Páginas de Tareas</h1>
                            <p>Debes estar autenticado para ver sus tareas</p>
                        </>
                    )}         
                
                </div>
    
    )
}
export default TasksPage;