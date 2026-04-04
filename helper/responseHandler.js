const attachResponseHelpers = (req, res, next) => {
  res.apiSuccess = (response, status = 200) => {
    return res.status(status).json({
      isSuccess: true,
      isError: false,
      response,
      error: null,
    });
  };

  next();
};

module.exports = { attachResponseHelpers };