import mongoose from 'mongoose';
import { mongoDBURL } from '../config.js';
import { User } from '../models/usermodel.js';
import { Book } from '../models/bookmodel.js';
import bcrypt from 'bcryptjs';

async function run() {
  try {
    await mongoose.connect(mongoDBURL);
    console.log('Connected to DB');

    // ensure an admin/system user exists
    let admin = await User.findOne({ email: 'admin@local' });
    if (!admin) {
      const passwordHash = await bcrypt.hash('adminpass', 10);
      admin = await User.create({ email: 'admin@local', passwordHash, name: 'Admin' });
      console.log('Created admin user');
    }

    // set owner for books missing owner
    const res = await Book.updateMany({ owner: { $exists: false } }, { $set: { owner: admin._id } });
    console.log('Updated books:', res.modifiedCount);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
