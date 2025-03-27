import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'No autorizado' });
  }
};