const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/users', require('./routes/users'));
app.use('/api/surveys', require('./routes/surveys'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
