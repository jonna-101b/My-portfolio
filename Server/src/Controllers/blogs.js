import mongoose from 'mongoose';
import BlogModel from '../Models/blogs.js';
import { APIError } from '../Errors/APIError.js';
import { deleteUploadedFile, deleteReplacedFiles, uploadToCloudinary, isCloudinaryUrl } from '../Utils/upload.js';

const getBlogs = async (req, res, next) => {
	try {
		const blogs = await BlogModel.find({}).sort({ datePublished: -1 });
		res.status(200).json(blogs);
	}
	catch (error) {
		next(error);
	}
};

const addBlog = async (req, res, next) => {
	try {
		const blogData = { ...req.body };

		// Handle file if uploaded directly via multipart
		if (req.file) {
			const uploadRes = await uploadToCloudinary(req.file, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) {
				blogData.image = [uploadRes.secure_url];
			}
		}

		if (req.files) {
			const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
			if (files.length > 0) {
				const uploadedUrls = [];
				for (const f of files) {
					const uploadRes = await uploadToCloudinary(f, { folder: 'portfolio/images' });
					if (uploadRes?.secure_url) uploadedUrls.push(uploadRes.secure_url);
				}
				blogData.image = uploadedUrls;
			}
		}

		// Handle base64 data URIs in image array or string
		if (blogData.image) {
			if (Array.isArray(blogData.image)) {
				blogData.image = await Promise.all(
					blogData.image.map(async (img) => {
						if (typeof img === 'string' && (img.startsWith('data:') || (img.length > 500 && !isCloudinaryUrl(img)))) {
							const uploadRes = await uploadToCloudinary(img, { folder: 'portfolio/images' });
							return uploadRes?.secure_url || img;
						}
						return img;
					})
				);
			} else if (typeof blogData.image === 'string' && (blogData.image.startsWith('data:') || (blogData.image.length > 500 && !isCloudinaryUrl(blogData.image)))) {
				const uploadRes = await uploadToCloudinary(blogData.image, { folder: 'portfolio/images' });
				blogData.image = uploadRes?.secure_url ? [uploadRes.secure_url] : [blogData.image];
			}
		}

		const newBlog = await BlogModel.create(blogData);
		res.status(200).json(newBlog);
	}
	catch (error) {
		next(error);
	}
};

const updateBlog = async (req, res, next) => {
	try {
		const id = req.params.id;
	
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return next(APIError.notFound('No such blog'));
		}

		const existingBlog = await BlogModel.findById(id);
		if (!existingBlog) {
			return next(APIError.notFound('No such blog'));
		}

		const updates = { ...req.body };

		// Handle file if uploaded directly via multipart
		if (req.file) {
			const uploadRes = await uploadToCloudinary(req.file, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) {
				updates.image = [uploadRes.secure_url];
			}
		}

		if (req.files) {
			const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
			if (files.length > 0) {
				const uploadedUrls = [];
				for (const f of files) {
					const uploadRes = await uploadToCloudinary(f, { folder: 'portfolio/images' });
					if (uploadRes?.secure_url) uploadedUrls.push(uploadRes.secure_url);
				}
				updates.image = uploadedUrls;
			}
		}

		// Handle base64 data URIs in image array or string
		if (updates.image) {
			if (Array.isArray(updates.image)) {
				updates.image = await Promise.all(
					updates.image.map(async (img) => {
						if (typeof img === 'string' && (img.startsWith('data:') || (img.length > 500 && !isCloudinaryUrl(img)))) {
							const uploadRes = await uploadToCloudinary(img, { folder: 'portfolio/images' });
							return uploadRes?.secure_url || img;
						}
						return img;
					})
				);
			} else if (typeof updates.image === 'string' && (updates.image.startsWith('data:') || (updates.image.length > 500 && !isCloudinaryUrl(updates.image)))) {
				const uploadRes = await uploadToCloudinary(updates.image, { folder: 'portfolio/images' });
				updates.image = uploadRes?.secure_url ? [uploadRes.secure_url] : [updates.image];
			}
		}

		const updatedBlog = await BlogModel.findByIdAndUpdate(id, updates, { new: true });

		if (updatedBlog) {
			// If blog image(s) were replaced, removed, or cleared, clean up old files from Cloudinary or Server/uploads
			if (updates.image !== undefined && existingBlog.image) {
				await deleteReplacedFiles(existingBlog.image, updates.image);
			}
			res.status(200).json(updatedBlog);
		}
		else {
			return next(APIError.notFound('No such blog'));
		}
	}
	catch (error) {
		next(error);
	}	
};

const deleteBlog = async (req, res, next) => {
	try {
		const id = req.params.id;
		
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return next(APIError.notFound('No such blog'));
		}
		
		const deletedBlog = await BlogModel.findByIdAndDelete(id);

		if (deletedBlog) {
			// Delete all blog images from Cloudinary or Server/uploads
			if (deletedBlog.image) {
				await deleteUploadedFile(deletedBlog.image);
			}
			res.status(200).json(deletedBlog);
		}
		else {
			return next(APIError.notFound('No such blog'));
		}
	}
	catch (error) {
		next(error);
	}
};

export { getBlogs, addBlog, updateBlog, deleteBlog };