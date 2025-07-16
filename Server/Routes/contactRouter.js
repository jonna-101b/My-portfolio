import express from 'express';
import { getAdminContact, updateAdminContact, addSocialLink, deleteSocialLink,
         getClientMessages, addClientMessage, deleteClientMessage } from '../Controllers/contacts.js';

const contactRouter = express.Router();


// Admin contact
contactRouter.get('/admin', getAdminContact);

contactRouter.patch('/admin', updateAdminContact);

contactRouter.post('/admin/social', addSocialLink);

contactRouter.delete('/admin/social/:id', deleteSocialLink);

// Client messages
contactRouter.get('/client', getClientMessages);

contactRouter.post('/client', addClientMessage);

contactRouter.delete('/client/:id', deleteClientMessage);

export default contactRouter;