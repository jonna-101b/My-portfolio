import mongoose from 'mongoose';

const testimonialsSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
        },
        position: {
                type: String,
                required: true,
        },
        image: {
                type: String,
        },
        testimonial: {
                type: String,
                required: true,
        },
        company: {
                type: String,
        },
        companyLink: {
                type: String,
        },
        date: {
                type: Date,
                default: Date.now,
        },
});

const TestimonialsModel = mongoose.model('Testimonials', testimonialsSchema);
export default TestimonialsModel;