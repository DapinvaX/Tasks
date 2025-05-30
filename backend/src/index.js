import app from './app.js';
import cnx from './db.js';
import 'dotenv/config'; 

cnx();

const port = 4000;

app.listen(port);

console.log('Servidor en puerto ', port);