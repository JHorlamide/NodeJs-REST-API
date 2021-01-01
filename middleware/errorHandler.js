export const error = (err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Internal server error, could not perform request.");
};
