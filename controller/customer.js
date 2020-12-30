import Customer from "../model/customer.js";
import { validateCustomer } from "../model/customer.js";

/***
========================
@desc: Get all genres
========================
|@access: Public
***/
export const getAllCustomer = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ name: 1 });
    res.send(customers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error from getAllCustomer");
  }
};

/***
========================
@desc: Get customerById
========================
|@access: Public
***/
export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    res.send(customer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
};

/***
===========================
@desc: Create new customer
===========================
|@access: Private
***/
export const createCustomer = async (req, res) => {
  const { name, isGold, phone } = req.body;

  try {
    const { error, value } = validateCustomer({ name, isGold, phone });

    if (error) {
      console.log(`Error: ${error.message}`);
      return res.status(500).send(error.message);
    }

    let customer = new Customer(value);
    customer = await customer.save();
    res.send(customer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
};

/***
=======================
@desc: Update customer
======================
|@access: Private
***/
export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, isGold, phone } = req.body;

  const updatedCustomer = {};
  if (name) updatedCustomer.name = name;
  if (isGold) updatedCustomer.isGold = isGold;
  if (phone) updatedCustomer.phone = phone;

  try {
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
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
};

/***
========================
@desc: Delete customer
========================
|@access: Private
***/
export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    let customer = await Customer.findById(id);

    if (!customer) {
      return res
        .status(400)
        .json({ msg: "There is no customer with given id" });
    }

    await Customer.findByIdAndRemove(id);
    res.json({ msg: "Customer removed successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
};
