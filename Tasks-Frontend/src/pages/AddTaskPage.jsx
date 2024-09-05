import TasksForm from "../components/TasksForm";

function AddTaskPage(){

    return (
        <div className="container">
            <h1 className="text-center">Añadir Task</h1>
            <TasksForm />
        </div>
    );

}
export default AddTaskPage;