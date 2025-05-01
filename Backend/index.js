import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import fs from 'fs';
import http2 from 'http2';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const allowedOrigins = [
    'http://localhost:8080',
    'https://biblio-games-464ev8tj6-l4p34rs-projects.vercel.app',
    'https://biblio-games.vercel.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
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


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur port ${PORT}`);
});

/*
app.listen(5001, '0.0.0.0', () => {
    console.log('Server is accessible on local network at port 5001');
  });
*/