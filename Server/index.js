import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config({path: './.env'});

const app = express();

// Middleware
app.use(cors({
        origin: 'http://localhost:3001' // Only allow this origin
}));

app.use(express.json());


// Server listening
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});