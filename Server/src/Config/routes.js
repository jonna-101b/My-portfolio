import configurePassport from "./Passports/index.js";
import passport from "passport";
import express from "express";
// Importing routers
import authRouter from '../Routes/authRouter.js';
import profileRouter from '../Routes/profileRouter.js';
import qualificationsRouter from '../Routes/qualificationsRouter.js';
import skillsRouter from '../Routes/skillsRouter.js';
import projectsRouter from '../Routes/projectsRouter.js';
import testimonialsRouter from '../Routes/testimonialsRouter.js';
import blogRouter from '../Routes/blogsRouter.js';
import notificationsRouter from '../Routes/notificationsRouter.js';
import activitiesRouter from '../Routes/activitiesRouter.js';
import ratingsRouter from '../Routes/ratingsRouter.js';
import uploadRouter from '../Routes/uploadRouter.js';


const router = express.Router();

configurePassport();
router.use(passport.initialize());

// Routes
router.use("/auth/", authRouter);
router.use("/profile", profileRouter);
router.use("/qualifications", qualificationsRouter);
router.use("/skills", skillsRouter);
router.use("/projects", projectsRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/blogs", blogRouter);
router.use("/notifications", notificationsRouter);
router.use("/activities", activitiesRouter);
router.use("/ratings", ratingsRouter);
router.use("/upload", uploadRouter);

export default router;
