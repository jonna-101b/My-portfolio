import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import { getProfilePage, updateProfilePage, updateDescription, addSocialLinks, updateSocialLink, deleteSocialLink } from '../Controllers/profile.js';
import { updateProfileValidator, updateDescriptionValidator, createSocialLinksValidator, updateSocialLinkValidator, socialLinkIdParamValidator } from '../Validator/profileValidator.js';


const profileRouter = express.Router();


profileRouter.get("/", getProfilePage);

profileRouter.put("/", authenticate, updateProfileValidator, updateProfilePage);

profileRouter.patch("/description", authenticate, updateDescriptionValidator, updateDescription);

profileRouter.post('/social', authenticate, createSocialLinksValidator, addSocialLinks);

profileRouter.patch('/social/:id', authenticate, updateSocialLinkValidator, updateSocialLink);

profileRouter.delete('/social/:id', authenticate, socialLinkIdParamValidator, deleteSocialLink);


export default profileRouter;
