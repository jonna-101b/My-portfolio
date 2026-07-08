import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
dotenv.config({path: './.env'});

// Importing routers
import profileRouter from './Routes/profileRouter.js';
import qualificationsRouter from './Routes/qualificationsRouter.js';
import skillsRouter from './Routes/skillsRouter.js';
import projectsRouter from './Routes/projectsRouter.js';
import testimonialsRouter from './Routes/testimonialsRouter.js';
import articlesRouter from './Routes/articlesRouter.js';
import notificationsRouter from './Routes/notificationsRouter.js';
import activitiesRouter from './Routes/activitiesRouter.js';


const app = express();

// Middleware
app.use(cors({
        origin: 'http://localhost:3001' // Only allow this origin
}));

app.use(express.json());


// Routes
app.use("/api/profile", profileRouter);
app.use("/api/qualifications", qualificationsRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/activities", activitiesRouter);


// Server listening
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI)
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error.message);
        });