import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const shortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, default: nanoid(6) },
  clicks: { type: Number, required: true, default: 0 },
  createdAt: { type: String, default: new Date() },
});

export default mongoose.model('ShortUrl', shortUrlSchema);
