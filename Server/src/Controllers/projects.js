import mongoose from "mongoose";
import ProjectModel from "../Models/projects.js";
import { APIError } from "../Errors/APIError.js";
import { deleteUploadedFile, deleteReplacedFiles, uploadToCloudinary, isCloudinaryUrl } from "../Utils/upload.js";

const getProjects = async (req, res, next) => {
	try {
		const projects = await ProjectModel.find({}).sort({ createdAt: -1 });
		res.status(200).json(projects);
	}
	catch (error) {
		next(error);
	}
};

const addProject = async (req, res, next) => {
	try {
		let { title, domains, description, image, features, techStack, projectLink, githubLink, contribution } = req.body;

		// 1. Upload main project image if file was passed or if data URI
		if (req.file) {
			const uploadRes = await uploadToCloudinary(req.file, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) {
				image = uploadRes.secure_url;
			}
		} else if (typeof image === 'string' && (image.startsWith('data:') || (image.length > 500 && !isCloudinaryUrl(image)))) {
			const uploadRes = await uploadToCloudinary(image, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) {
				image = uploadRes.secure_url;
			}
		}

		// 2. Upload any techStack icons if provided as base64/data URI
		if (Array.isArray(techStack)) {
			techStack = await Promise.all(
				techStack.map(async (tech) => {
					if (tech?.icon && typeof tech.icon === 'string' && (tech.icon.startsWith('data:') || (tech.icon.length > 500 && !isCloudinaryUrl(tech.icon)))) {
						const uploadRes = await uploadToCloudinary(tech.icon, { folder: 'portfolio/images' });
						return { ...tech, icon: uploadRes?.secure_url || tech.icon };
					}
					return tech;
				})
			);
		}

		const newProject = await ProjectModel.create({ title, domains, description, image, features, techStack, projectLink, githubLink, contribution });
		res.status(200).json(newProject);
	}
	catch (error) {
		next(error);
	}
};

const updateProject = async (req, res, next) => {
	try {
		const id = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return next(APIError.notFound('No such project!'));
		}

		const existingProject = await ProjectModel.findById(id);
		if (!existingProject) {
			return next(APIError.notFound('No such project!'));
		}

		const updates = { ...req.body };

		// 1. Upload project image if file or data URI provided
		if (req.file) {
			const uploadRes = await uploadToCloudinary(req.file, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) {
				updates.image = uploadRes.secure_url;
			}
		} else if (typeof updates.image === 'string' && (updates.image.startsWith('data:') || (updates.image.length > 500 && !isCloudinaryUrl(updates.image)))) {
			const uploadRes = await uploadToCloudinary(updates.image, { folder: 'portfolio/images' });
			if (uploadRes?.secure_url) {
				updates.image = uploadRes.secure_url;
			}
		}

		// 2. Upload any techStack icons if provided as data URI
		if (Array.isArray(updates.techStack)) {
			updates.techStack = await Promise.all(
				updates.techStack.map(async (tech) => {
					if (tech?.icon && typeof tech.icon === 'string' && (tech.icon.startsWith('data:') || (tech.icon.length > 500 && !isCloudinaryUrl(tech.icon)))) {
						const uploadRes = await uploadToCloudinary(tech.icon, { folder: 'portfolio/images' });
						return { ...tech, icon: uploadRes?.secure_url || tech.icon };
					}
					return tech;
				})
			);
		}

		const updatedProject = await ProjectModel.findByIdAndUpdate(id, updates, { new: true });

		if (updatedProject) {
			// If project image was replaced or cleared, delete the old file from Cloudinary / local storage
			if (updates.image !== undefined && existingProject.image) {
				await deleteReplacedFiles(existingProject.image, updates.image);
			}
			res.status(200).json(updatedProject);
		}
		else {
			return next(APIError.notFound('No such project!'));
		}
	}
	catch (error) {
		next(error);
	}
};

const deleteProject = async (req, res, next) => {
	try {
		const id = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return next(APIError.notFound('No such project!'));
		}

		const deletedProject = await ProjectModel.findByIdAndDelete(id);

		if (deletedProject) {
			// Delete project image from Cloudinary or Server/uploads
			if (deletedProject.image) {
				await deleteUploadedFile(deletedProject.image);
			}
			// Delete any techStack icons that were uploaded files
			if (Array.isArray(deletedProject.techStack)) {
				for (const tech of deletedProject.techStack) {
					if (tech?.icon) await deleteUploadedFile(tech.icon);
				}
			}

			res.status(200).json(deletedProject);
		}
		else {
			return next(APIError.notFound('No such project!'));
		}
	}
	catch (error) {
		next(error);
	}
};

export { getProjects, addProject, updateProject, deleteProject };
