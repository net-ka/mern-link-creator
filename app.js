const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth.routes');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', authRoute);

const PORT = config.get('port') || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();

app.listen(PORT, () => console.log(`App started ${PORT}`))