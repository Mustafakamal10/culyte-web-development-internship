const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (err.name === "MulterError" ? 400 : 500);
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong"
  });
};

module.exports = errorHandler;
