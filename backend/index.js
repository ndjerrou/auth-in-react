const express = require('express');

const cors = require('cors');

const connect = require('./db/connect');
const users = require('./routes/users');
const auth = require('./routes/auth');

connect();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', users);
app.use('/api/auth', auth);

app.listen(9000, () => console.log('Server listenning on port 9000'));
