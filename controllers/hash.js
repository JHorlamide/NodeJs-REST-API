import bcrypt from 'bcrypt';

const salt = await bcrypt.genSalt(10);

const hash = await bcrypt.hash('#Obalola21#', salt);

console.log(hash)