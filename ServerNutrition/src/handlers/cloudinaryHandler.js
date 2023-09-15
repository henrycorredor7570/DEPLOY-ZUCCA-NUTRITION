const { downloadCloudinary } = require("../controllers/cloudinaryController");

const cloudinaryHandler = async (req, res) => {
    try {
      const {name, lastName} = req.query 
        const response = await downloadCloudinary(name, lastName);
        res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
    cloudinaryHandler,
}