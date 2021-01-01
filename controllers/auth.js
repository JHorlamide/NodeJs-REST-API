import bcrypt from "bcrypt";
import Joi from "joi";
import { User } from "../model/user.js";

const validateCredential = (credential) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(320).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(credential);
};


export const authUser = async (req, res) => {
  const { email, password } = req.body;
  const { error } = validateCredential({ email, password });

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalide credentials, user does not exist.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send("Invalide credentials, password in incorrect");
    }

    const token = user.generateAuthToken();
    res.send({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};
