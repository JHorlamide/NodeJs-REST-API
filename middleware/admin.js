export const admin = (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) {
    return res.status(403).send("Access denied.");
  }
  next();
};
