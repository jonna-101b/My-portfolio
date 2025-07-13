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
});

const contactSchema = new mongoose.Schema({
        adminContact: {type: adminContactSchema, required: true},
        clientContact: {type: clientContactSchema, required: true},       
})

const ContactModel = mongoose.model('Contact', contactSchema);
export default ContactModel;