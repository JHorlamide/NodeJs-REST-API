import _ from "lodash";
import bcrypt from "bcrypt";
import { User } from "../model/user.js";
import { userValidation } from "../model/user.js";

/***
==========================
@desc: Get logged in user
==========================
|@access: Private
***/
export const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

/***
========================
@desc: Create user
========================
|@access: Public
***/
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { error } = userValidation({ name, email, password });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send("Use already exits.");
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};
