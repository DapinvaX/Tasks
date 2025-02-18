import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const newTask = new Task({
      title,
      description,
      completed,
      user: req.user._id
    });

    const savedTask = await newTask.save();
    return res.json(savedTask);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear la tarea' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};