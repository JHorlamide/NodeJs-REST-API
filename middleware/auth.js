import jwt from "jsonwebtoken";
import config from "config";

export const auth = async (req, res, next) => {
  /*** GET token from request header ***/
  const token = req.header("x-auth-token");

  /*
  ===================================
    Check to see if token exits
  ===================================
  */
  if (!token) {
    return res.status(401).send("No token, authorization denied.");
  }

  try {
    /*** If there is a token, pull out the payload ***/
    const deconded = jwt.verify(token, config.get("jwtSecret"));
    req.user = deconded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Invalide token");
  }
};