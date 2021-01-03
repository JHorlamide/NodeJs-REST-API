import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "../model/user.js";
import { asyncMiddleware } from "../middleware/asyncMiddleware.js";

const validateCredential = (credential) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(320).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(credential);
};

export const authUser = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;
  const { error } = validateCredential({ email, password });

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Invalide credentials, user does not exist.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Invalide credentials, password in incorrect");
  }

  const token = user.generateAuthToken();
  res.send({ token });
});
