import mongoose from 'mongoose';


const descriptionSchema = new mongoose.Schema({
        brief: { type: String, required: true },
        detailed: { type: String, required: true },
});

const socialLinksSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
        },
        icon: {
                type: String,
                required: true,
        },
        url: {
                type: String,
                required: true,
        },
});

const profileSchema = new mongoose.Schema({
        firstName: {
                type: String,
                required: true,
        },
        lastName: {
                type: String,
                required: true,
        },
        nickName: {
                type: String,
                required: true,
        },
        gender: {
                type: String,
                required: true,
        },
        birthDate: {
                type: Date,
                require: true,
        },
        profession: {
                type: String,
                required: true,
        },
        picture: {
                type: String,
                required: true,
        },
        bio: {
                type: String,
                required: true,
        },
        logo: {
                type: String,
                required: true,
        },
        description: {
                type: descriptionSchema,
                required: true,
        },
        phone: {
                type: String,
                required: true,
        },
        email: {
                type: String,
                required: true,
        },
        address: {
                type: String,
                required: true,
        },
        socialLinks: {
                type: [socialLinksSchema],
                required: true,
        },
        resumeLink: {
                type: String,
                required: true,
        },
});

const ProfileModel = mongoose.model('Profile', profileSchema);
export default ProfileModel;