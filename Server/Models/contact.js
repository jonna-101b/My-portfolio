import mongoose from 'mongoose';

const socialLinksSchema = new mongoose.Schema({
        platform: {
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

const adminContactSchema = new mongoose.Schema({
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
});

const clientContactSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
        },
        email: {
                type: String,
                required: true,
        },
        subject: {
                type: String,
                required: true,
        },
        message: {
                type: String,
                required: true,
        },
}, { timestamps: true });


const AdminContactModel = mongoose.model('AdminContact', adminContactSchema);
const ClientContactModel = mongoose.model('ClientContact', clientContactSchema);
export { AdminContactModel, ClientContactModel };