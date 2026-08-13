import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);
