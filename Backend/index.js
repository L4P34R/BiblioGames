import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import fs from 'fs';
import http2 from 'http2';

const app = express();

const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

/*
try {
    const keyPath = 'certs/server.key';
    const certPath = 'certs/server.crt';

    if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
        throw new Error('Certificat SSL manquant. Vérifie les fichiers dans /certs/');
    }

    const server = http2.createSecureServer({
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
    }, app);

    server.listen(5001, () => {
        console.log('Server is running on https://localhost:5001 (HTTP/2)');
    });

    server.on('error', (err) => {
        console.error('Erreur serveur :', err);
    });
} catch (error) {
    console.error('Erreur critique au démarrage du serveur :', error.message);
}
*/


app.listen(5001, () => {
    console.log("Serveur HTTP1 lancé sur http://localhost:5001");
});

/*
app.listen(5001, '0.0.0.0', () => {
    console.log('Server is accessible on local network at port 5001');
  });
  */
