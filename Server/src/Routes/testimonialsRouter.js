import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import trackActivity from '../Middleware/trackActivity.js';
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from '../Controllers/testimonials.js';
import { createTestimonialValidator, updateTestimonialValidator, testimonialIdParamValidator } from '../Validator/testimonialsValidator.js';


const testimonialsRouter = express.Router();

// Define your testimonials routes here
testimonialsRouter.get("/", getTestimonials);

testimonialsRouter.post("/", authenticate, createTestimonialValidator, trackActivity('Testimonials'), addTestimonial);

testimonialsRouter.put("/:id", authenticate, updateTestimonialValidator, trackActivity('Testimonials'), updateTestimonial);

testimonialsRouter.delete("/:id", authenticate, testimonialIdParamValidator, trackActivity('Testimonials'), deleteTestimonial);

export default testimonialsRouter;
