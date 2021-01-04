import Joi from "joi";
import JoiObjId from "joi-objectid";

export const JoiObjectIdValidation = () => {
  const JoiObjectId = JoiObjId(Joi);
  return JoiObjectId;
};
