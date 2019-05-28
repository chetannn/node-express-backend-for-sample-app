exports.getAllUsers = (req,res) => {
  res.json({
    message: 'Success!!!'
  });
}

exports.getUserById = (req,res,next) => {
  res.json({
    userId: req.params.userId
  });
}