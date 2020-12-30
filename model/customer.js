import mongoose from "mongoose";
import Joi from "joi";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trime: true,
  },

  isGold: {
    type: Boolean,
    required: true,
    default: false,
  },
  
  phone: {
    type: Number,
    trim: true,
    required: function () {
      return this.isGold;
    },
  },
});

export const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    isGold: Joi.boolean(),
    phone: Joi.number().min(11).required(),
  });

  return schema.validate(customer);
}

const Customer = mongoose.model("customer", customerSchema);
export default Customer;
