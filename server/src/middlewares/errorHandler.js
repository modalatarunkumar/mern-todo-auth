const errorHandler = (err, _req, res, _next) => {
  console.error("Error ", err); // Log for debugging (can be improved with winston later)

  let statusCode = 500;
  let message = "Internal Server Error";
  
  // CustomError (app errors)
  if(err.code && Number.isInteger(err.code)){
    statusCode = err.code;
    message = err.message;
  }

  // Mongoose Validation Error
  else if(err.name === "ValidationError"){
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(", ");
  }

  // Mongoose CastError (invalid ObjectId)
  else if(err.name === "CastError"){
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Duplicate key error
  else if(err.code === 11000){
    statusCode = 409;
    message = `Duplicate value for ${Object.keys(err.keyValue).join(", ")}`;
  }
  // production safe message
  if(process.env.NODE_ENV === "production"){

    message =
    statusCode === 500
    ? "Internal Server Error"
    : message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;