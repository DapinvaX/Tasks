import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    const user = new User({ name, email, password });
    await user.save();

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    // Enviar token en cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 día
    });

    // Enviar respuesta sin contraseña
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return res.json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    // Enviar token en cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 día
    });

    // Enviar usuario sin contraseña
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return res.json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  });
  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  return res.json(req.user);
};