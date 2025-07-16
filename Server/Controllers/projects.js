import mongoose from "mongoose";
import ProjectModel from "../Models/projects.js";



const getProjects = async (req, res) => {
        try {
                const projects = await ProjectModel.find({}).sort({ createdAt: -1 });
                res.status(200).json(projects)
        }
        catch (error) {
                res.status(404).json({ error: error.message })
        }
};

const addProject = async (req, res) => {
        try {
                const {  title, concept, description, image, functions, techStack, projectLink, githubLink } = req.body;
                const newProject = await ProjectModel.create({  title, concept, description, image, functions, techStack, projectLink, githubLink });
                res.status(200).json(newProject);
        }
        catch (error) {
                res.status(404).json({ error: error.message })
        }
};

const updateProject = async (req, res) => {
        try {
                const id = req.params.id;

                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: "No such project!" });
                }

                const updatedProject = await ProjectModel.findByIdAndUpdate(id, {...req.body}, { new: true });

                if (updatedProject) {
                        res.status(200).json(updatedProject);
                }
                else {
                        res.status(404).json({ error: "No such project!"});
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message })
        }
};

const deleteProject = async (req, res) => {
        try {
                const id = req.params.id;

                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: "No such project!" });
                }

                const deletedProject = await ProjectModel.findByIdAndDelete(id);

                if (deletedProject) {
                        res.status(200).json(deletedProject);
                }
                else {
                        res.status(404).json({ error: "No such project!"});
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message })
        }
};

export { getProjects, addProject, updateProject, deleteProject };