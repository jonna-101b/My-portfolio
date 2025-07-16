import express from 'express';
import { getTestimonials, addTestimonial, updateTestimonial,  deleteTestimonial } from '../Controllers/testimonials.js';


const testimonialsRouter = express.Router();

// Define your testimonials routes here
testimonialsRouter.get("/", getTestimonials);

testimonialsRouter.post("/", addTestimonial);

testimonialsRouter.patch("/:id", updateTestimonial);

testimonialsRouter.delete("/:id", deleteTestimonial);

export default testimonialsRouter;