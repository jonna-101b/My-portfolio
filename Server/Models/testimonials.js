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
        picture: {
                type: String,
        },
        testimony: {
                type: String,
                required: true,
        },
        company: {
                type: String,
        },
        email: {
                type: String,
                required: true,
        },
}, { timestamps: true });

const TestimonialsModel = mongoose.model('Testimonials', testimonialsSchema);
export default TestimonialsModel;