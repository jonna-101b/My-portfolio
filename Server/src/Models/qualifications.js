import mongoose from 'mongoose';


const durationSchema = new mongoose.Schema({
        from: { type: Date, required: true },
        to: { type: Date, required: true },
});

const qualificationsSchema = new mongoose.Schema({
        discipline: {
                type: String,
                required: true,
        },
        organization: {
                type: String,
                required: true,
        },
        description: {
                type: String,
                required: true,
        },
        duration: {
                type: durationSchema,
                required: true,
        },
        active: {
                type: Boolean,
                default: false,
        },
        type: {
                type: String,
                required: true,
        }
}, { timestamps: true });

const QualificationsModel = mongoose.model('Qualifications', qualificationsSchema);
export default QualificationsModel;