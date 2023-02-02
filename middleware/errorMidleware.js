const globalErorrHandlingMidleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    erorr: err,
    messgae: err.messgae,
    stack: err.stack,
  });
};

module.exports =globalErorrHandlingMidleware;