import app from './app.js';
import { MONGODB_URI, PORT } from './config.js';
import mongoose from 'mongoose';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => console.error('Error conectando a MongoDB:', err));