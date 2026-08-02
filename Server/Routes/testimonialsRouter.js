import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getTestimonials, addTestimonial, updateTestimonial,  deleteTestimonial } from '../Controllers/testimonials.js';


const testimonialsRouter = express.Router();

// Define your testimonials routes here
testimonialsRouter.get("/", getTestimonials);

testimonialsRouter.post("/", authenticate, addTestimonial);

testimonialsRouter.patch("/:id", authenticate, updateTestimonial);

testimonialsRouter.delete("/:id", authenticate, deleteTestimonial);

export default testimonialsRouter;