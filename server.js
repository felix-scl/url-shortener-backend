import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import ShortUrl from './models/shortUrl.js';

const app = express();
const PORT = process.env.PORT || 8800;

mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const shortURLs = await ShortUrl.find();
  res.json(shortURLs);
});

app.post('/shortenUrl', async (req, res) => {
  await ShortUrl.create({ originalUrl: req.body.fullUrl });
  res.json({ ok: true });
});

app.get('/:shortUrl', async (req, res) => {
  const shortURL = await ShortUrl.findOne({ shortId: req.params.shortUrl });

  if (shortURL == null) return res.sendStatus(404);
  shortURL.clicks++;
  shortURL.save();

  res.redirect(shortURL.originalUrl);
});

app.listen(PORT, console.log(`Connected to port ${PORT}`));
