import express from 'express';


const contactRouter = express.Router();

// Define your contact routes here
contactRouter.get("/", getContactPage);

contactRouter.post("/", postContactPage);

contactRouter.patch("/:id", updateContactPage);

contactRouter.delete("/:id", deleteContactPage);

export default contactRouter;