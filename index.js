import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import cors from 'cors';
import logger from "morgan";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import fileUpload from 'express-fileupload';

import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});


async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ertzrg3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
        );

        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();