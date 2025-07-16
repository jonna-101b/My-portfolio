import mongoose from 'mongoose';
import TestimonialsModel from '../Models/testimonials.js';


const getTestimonials = async (req, res) => {
        try {
                const Testimonials = await TestimonialsModel.find({}).sort({ date: -1 });
                res.status(200).json(Testimonials)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

const addTestimonial = async (req, res) => {
        try {
                const newTestimonial = await TestimonialsModel.create({ ...req.body });
                res.status(200).json(newTestimonial);
        }
        catch (error) {
                res.status(404).json({error: error.message});
        }
};

const updateTestimonial = async (req, res) => {
        try {
                const id = req.params.id;
        
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such Testimonial' });
                }

                const updatedTestimonial = await TestimonialsModel.findByIdAndUpdate(id, {...req.body }, { new: true });

                if (updatedTestimonial) {
                        res.status(200).json(updatedTestimonial);
                }
                else {
                        res.status(404).json({ error: 'No such Testimonial' });
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }       
};

const deleteTestimonial = async (req, res) => {
        try {
                const id = req.params.id;
                
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such Testimonial' });
                }
                
                const deletedTestimonial = await TestimonialsModel.findByIdAndDelete(id);

                if (deletedTestimonial) {
                        res.status(200).json(deletedTestimonial);
                }
                else {
                        res.status(404).json({ error: 'No such Testimonial' });
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

export { getTestimonials, addTestimonial, updateTestimonial,  deleteTestimonial };