import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';

const app = express();

const corsOptions = {
    origin: 'http://localhost:8080', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});