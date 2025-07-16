import HomeModel from '../Models/home.js';

const getHomePage = async (req, res) => {
        try {
                const homepageData = await HomeModel.findOne();
                res.status(200).json(homepageData);
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
}

const updateHomePage = async (req, res) => {
        try {
                const updatedHomePage = await HomeModel.findOneAndUpdate({} , req.body, { new: true, upsert: true });
                res.status(200).json(updatedHomePage);
                
        }
        catch (error) {
                res.status(404).json({ error: error.message });
        }
}

export { getHomePage, updateHomePage };