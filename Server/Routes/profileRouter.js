import express from 'express';
import { getProfilePage, updateProfilePage, updateDescription, addSocialLinks, updateSocialLink, deleteSocialLink } from '../Controllers/profile.js';


const profileRouter = express.Router();

// Defining the profile routers
profileRouter.get("/", getProfilePage);

profileRouter.patch("/", updateProfilePage);

profileRouter.patch("/description", updateDescription);

profileRouter.post('/social', addSocialLinks);

profileRouter.delete('/social/:id', updateSocialLink);

profileRouter.delete('/social/:id', deleteSocialLink);


export default profileRouter;