import Customer from "../model/customer.js";
import { validateCustomer } from "../model/customer.js";
import { asyncMiddleware } from "../middleware/asyncMiddleware.js";

/***
========================
@desc: Get all genres
========================
|@access: Public
***/
export const getAllCustomer = asyncMiddleware(async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  res.send(customers);
});

/***
========================
@desc: Get customerById
========================
|@access: Public
***/
export const getCustomerById = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findById(id);
  if (!customer) {
    return res.status(404).send("Customer not found");
  }
  res.send(customer);
});

/***
===========================
@desc: Create new customer
===========================
|@access: Private
***/
export const createCustomer = asyncMiddleware(async (req, res) => {
  const { name, isGold, phone } = req.body;

  const { error, value } = validateCustomer({ name, isGold, phone });

  if (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).send(error.message);
  }

  let customer = new Customer(value);
  customer = await customer.save();
  res.send(customer);
});

/***
=======================
@desc: Update customer
======================
|@access: Private
***/
export const updateCustomer = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const { name, isGold, phone } = req.body;

  const updatedCustomer = {};
  if (name) updatedCustomer.name = name;
  if (isGold) updatedCustomer.isGold = isGold;
  if (phone) updatedCustomer.phone = phone;

  let customer = await Customer.findById(id);

  if (!customer) {
    return res
      .status(404)
      .json({ msg: "There is no customer with the given Id." });
  }

  const { error, value } = validateCustomer(updatedCustomer);

  if (error) {
    console.log(error.message);
    return res.status(400).json({ msg: error.message });
  }

  customer = await Customer.findByIdAndUpdate(
    id,
    { $set: value },
    { new: true }
  );

  res.send(customer);
});

/***
========================
@desc: Delete customer
========================
|@access: Private
***/
export const deleteCustomer = asyncMiddleware(async (req, res) => {
  const { id } = req.params;

  let customer = await Customer.findById(id);

  if (!customer) {
    return res.status(400).json({ msg: "There is no customer with given id" });
  }

  await Customer.findByIdAndRemove(id);
  res.json({ msg: "Customer removed successfully" });
});
