import mongoose from 'mongoose';
import { AdminContactModel, ClientContactModel } from '../Models/contact';

// Controller functions for Admin Contact
const getAdminContact = async (req, res) => {
        try {
                const adminContact = await AdminContactModel.findOne();
                res.status(200).json(adminContact)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

const updateAdminContact = async (req, res) => {
        try {
                const adminContact = await AdminContactModel.findOneAndUpdate({}, req.body, { new: true, upsert: true });
                await adminContact.save();
                res.status(200).json(adminContact)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

const addSocialLink = async (req, res) => {
        try {
                const contact = await AdminContactModel.findOne();
                contact.socialLinks.push({ ...req.body });
                await contact.save();
                res.status(200).json(contact)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

const deleteSocialLink = async (req, res) => {
        try {
                const id = req.params.id;

                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such message!' });
                }
                
                const contact = await AdminContactModel.findOne();
                const deletedSocialLink = contact.socialLinks.id(id);

                if (!deletedSocialLink) {
                        return res.status(404).json({ error: 'No such social link!' });
                }

                deletedSocialLink.remove();
                await contact.save();
                res.status(200).json(contact)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};



// Controller functions for Client Contact
const getClientMessages = async (req, res) => {
        try {
                const clientMessage = await ClientContactModel.find({}).sort({ createdAt: -1 });
                res.status(200).json(clientMessage)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

const addClientMessage = async (req, res) => {
        try {
                const clientMessage = await ClientContactModel.create({ ...req.body });
                res.status(200).json(clientMessage)
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

const deleteClientMessage = async (req, res) => {
        try {
                const id = req.params.id;
        
                if (!mongoose.Types.ObjectId.isValid(id)) {
                        return res.status(404).json({ error: 'No such message!' });
                }

                const clientMessage = await ClientContactModel.findByIdAndDelete(id);

                if (clientMessage) {
                        res.status(200).json(clientMessage);
                }
                else {
                        res.status(404).json({ error: 'No such message' });
                }
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
};

export { getAdminContact, updateAdminContact, addSocialLink, deleteSocialLink,
         getClientMessages, addClientMessage, deleteClientMessage };