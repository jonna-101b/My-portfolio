import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import trackActivity from '../Middlewares/trackActivity.js';
import { getProfilePage, updateProfilePage, updateDescription, addSocialLinks, updateSocialLink, deleteSocialLink, updateLogoVisibility } from '../Controllers/profile.js';
import { updateProfileValidator, updateDescriptionValidator, createSocialLinksValidator, updateSocialLinkValidator, socialLinkIdParamValidator, updateLogoVisibilityValidator } from '../Validator/profileValidator.js';


const profileRouter = express.Router();


profileRouter.get("/", getProfilePage);

profileRouter.put("/", authenticate, updateProfileValidator, trackActivity('Profile'), updateProfilePage);

profileRouter.put("/description", authenticate, updateDescriptionValidator, trackActivity({ destination: 'Profile Description', title: 'Profile Description' }), updateDescription);
profileRouter.patch("/description", authenticate, updateDescriptionValidator, trackActivity({ destination: 'Profile Description', title: 'Profile Description' }), updateDescription);
profileRouter.patch("/logo-visibility", authenticate, updateLogoVisibilityValidator, trackActivity({ destination: 'Logo Visibility', title: 'Logo Visibility' }), updateLogoVisibility);
profileRouter.put("/logo-visibility", authenticate, updateLogoVisibilityValidator, trackActivity({ destination: 'Logo Visibility', title: 'Logo Visibility' }), updateLogoVisibility);

profileRouter.post('/social', authenticate, createSocialLinksValidator, trackActivity('Social Links'), addSocialLinks);

profileRouter.patch('/social/:id', authenticate, updateSocialLinkValidator, trackActivity('Social Link'), updateSocialLink);

profileRouter.delete('/social/:id', authenticate, socialLinkIdParamValidator, trackActivity('Social Link'), deleteSocialLink);


export default profileRouter;
