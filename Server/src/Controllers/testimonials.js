import mongoose from 'mongoose';
import TestimonialsModel from '../Models/testimonials.js';
import { APIError } from '../Errors/APIError.js';
import { deleteUploadedFile, deleteReplacedFiles } from '../Utils/upload.js';

const getTestimonials = async (req, res, next) => {
	try {
		const Testimonials = await TestimonialsModel.find({}).sort({ date: -1 });
		res.status(200).json(Testimonials);
	}
	catch (error) {
		next(error);
	}
};

const addTestimonial = async (req, res, next) => {
	try {
		const newTestimonial = await TestimonialsModel.create({ ...req.body });
		res.status(200).json(newTestimonial);
	}
	catch (error) {
		next(error);
	}
};

const updateTestimonial = async (req, res, next) => {
	try {
		const id = req.params.id;
	
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return next(APIError.notFound('No such Testimonial'));
		}

		const existingTestimonial = await TestimonialsModel.findById(id);
		if (!existingTestimonial) {
			return next(APIError.notFound('No such Testimonial'));
		}

		const updatedTestimonial = await TestimonialsModel.findByIdAndUpdate(id, { ...req.body }, { new: true });

		if (updatedTestimonial) {
			// If picture was replaced or cleared, remove old file from Server/uploads
			if (req.body.picture !== undefined && existingTestimonial.picture) {
				deleteReplacedFiles(existingTestimonial.picture, req.body.picture);
			}
			res.status(200).json(updatedTestimonial);
		}
		else {
			return next(APIError.notFound('No such Testimonial'));
		}
	}
	catch (error) {
		next(error);
	}	
};

const deleteTestimonial = async (req, res, next) => {
	try {
		const id = req.params.id;
		
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return next(APIError.notFound('No such Testimonial'));
		}
		
		const deletedTestimonial = await TestimonialsModel.findByIdAndDelete(id);

		if (deletedTestimonial) {
			// Delete testimonial picture from Server/uploads
			if (deletedTestimonial.picture) {
				deleteUploadedFile(deletedTestimonial.picture);
			}
			res.status(200).json(deletedTestimonial);
		}
		else {
			return next(APIError.notFound('No such Testimonial'));
		}
	}
	catch (error) {
		next(error);
	}
};

export { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial };