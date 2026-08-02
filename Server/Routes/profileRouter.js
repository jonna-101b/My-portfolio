import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getProfilePage, updateProfilePage, updateDescription, addSocialLinks, updateSocialLink, deleteSocialLink } from '../Controllers/profile.js';


const profileRouter = express.Router();


profileRouter.get("/", getProfilePage);

profileRouter.patch("/", authenticate. updateProfilePage);

profileRouter.patch("/description", authenticate, updateDescription);

profileRouter.post('/social', authenticate, addSocialLinks);

profileRouter.delete('/social/:id', authenticate, updateSocialLink);

profileRouter.delete('/social/:id', authenticate, deleteSocialLink);


export default profileRouter;