import mongoose from "mongoose";

const id = new mongoose.Types.ObjectId();

console.log(id.getTimestamp());

const isValidId = mongoose.Types.ObjectId.isValid(id);
console.log(isValidId);
