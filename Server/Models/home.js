import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema({
        logoImage: {
                type: String,
                required: true,
        },
        profession: {
                type: String,
                required: true,
        },
        heroText: {
                type: String,
                required: true,
        },
        resumeLink: {
                type: String,
                required: true,
        },
});

const HomeModel = mongoose.model('Home', homeSchema);
export default HomeModel;