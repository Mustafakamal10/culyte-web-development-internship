const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        originalname: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    });
  }
};

module.exports = {
  uploadFile
};
