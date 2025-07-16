import mongoose from 'mongoose';


const educationSchema = new mongoose.Schema({
        fieldOfStudy: {
                type: String,
                required: true,
        },
        institution: {
                type: String,
                required: true,
        },
        description: {
                type: String,
                required: true,
        },
        year: {
                type: String,
                required: true,
        },
        ongoing: {
                type: Boolean,
                default: false,
        },
});

const experienceSchema = new mongoose.Schema({
        jobTitle: {
                type: String,
                required: true,
        },
        company: {
                type: String,
                required: true,
        },
        description: {
                type: String,
                required: true,
        },
        duration: {
                type: String,
                required: true,
        },
        active: {
                type: Boolean,
                default: false,
        },
});

const aboutSchema = new mongoose.Schema({
        profileImage: {
                type: String,
        },
        intro: {
                type: String,
                required: true,
        },
        introMessage: {
                type: String,
                required: true,
        },
        educationAndExperienceMessage: {
                type: String,
                required: true,
        },
});


const EducationModel = mongoose.model('Education', educationSchema);
const ExperienceModel =mongoose.model('Experience', experienceSchema);
const AboutModel = mongoose.model('About', aboutSchema);
export { AboutModel, EducationModel, ExperienceModel };