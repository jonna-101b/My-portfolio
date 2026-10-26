import mongoose from 'mongoose';
import TestimonialsModel from '../Models/testimonials.js';
import { APIError } from '../Errors/APIError.js';
import { deleteUploadedFile, deleteReplacedFiles, uploadToCloudinary, isCloudinaryUrl } from '../Utils/upload.js';

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
		const testimonialData = { ...req.body };

		if (req.file) {
			const uploadRes = await uploadToCloudinary(req.file, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) testimonialData.picture = uploadRes.secure_url;
		} else if (typeof testimonialData.picture === 'string' && (testimonialData.picture.startsWith('data:') || (testimonialData.picture.length > 500 && !isCloudinaryUrl(testimonialData.picture)))) {
			const uploadRes = await uploadToCloudinary(testimonialData.picture, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) testimonialData.picture = uploadRes.secure_url;
		}

		const newTestimonial = await TestimonialsModel.create(testimonialData);
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

		const updates = { ...req.body };

		if (req.file) {
			const uploadRes = await uploadToCloudinary(req.file, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) updates.picture = uploadRes.secure_url;
		} else if (typeof updates.picture === 'string' && (updates.picture.startsWith('data:') || (updates.picture.length > 500 && !isCloudinaryUrl(updates.picture)))) {
			const uploadRes = await uploadToCloudinary(updates.picture, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) updates.picture = uploadRes.secure_url;
		}

		const updatedTestimonial = await TestimonialsModel.findByIdAndUpdate(id, updates, { new: true });

		if (updatedTestimonial) {
			// If picture was replaced or cleared, remove old file from Cloudinary or Server/uploads
			if (updates.picture !== undefined && existingTestimonial.picture) {
				await deleteReplacedFiles(existingTestimonial.picture, updates.picture);
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
			// Delete testimonial picture from Cloudinary or Server/uploads
			if (deletedTestimonial.picture) {
				await deleteUploadedFile(deletedTestimonial.picture);
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