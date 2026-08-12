import mongoose from "mongoose";
import ProjectModel from "../Models/projects.js";
import { APIError } from "../Errors/APIError.js";

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
                const { title, domains, description, image, features, techStack, projectLink, githubLink, contribution } = req.body;
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

                const updatedProject = await ProjectModel.findByIdAndUpdate(id, { ...req.body }, { new: true });

                if (updatedProject) {
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
