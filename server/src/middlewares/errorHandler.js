const errorHandler = (err, _req, res, _next) => {
  console.error(`[Error] ${err.message}`); // Log for debugging (can be improved with winston later)

  // Check if it's a known CustomError
  const statusCode = err.code || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? err.message || "Internal Server Error"
      : err.message;

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;