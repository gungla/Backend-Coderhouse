/* eslint-disable no-console */
require('dotenv').config();

const mongoose = require('mongoose');

const { server, PORT } = require('./api');

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Connected to DB.'))
.catch((err) => console.log('Error while connecting to DB', err));
