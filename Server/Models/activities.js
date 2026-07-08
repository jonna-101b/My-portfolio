import mongoose from 'mongoose';


const activitiesSchema = new mongoose.Schema({
        action: {
                type: String,
                required: true,
        },
        destination: {
                type: String,
                required: true,
        },
        title: {
                type: String,
                required: true,
        },
        date: {
                type: Date,
                default: Date.now,
        }
}, { strict: false });


const ActivitiesModel = mongoose.model('Activities', activitiesSchema);
export { ActivitiesModel };