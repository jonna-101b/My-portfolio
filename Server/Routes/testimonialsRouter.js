import express from 'express';


const testimonialsRouter = express.Router();

// Define your testimonials routes here
testimonialsRouter.get("/", getTestimonialsPage);

testimonialsRouter.post("/", postTestimonialsPage);

testimonialsRouter.patch("/:id", updateTestimonialsPage);

testimonialsRouter.delete("/:id", deleteTestimonialsPage);

export default testimonialsRouter;