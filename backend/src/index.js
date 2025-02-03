require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superheroRoutes = require('./routes/superheroes');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/superheroes', superheroRoutes);

app.get('/', (req, res) => {
    res.send('API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
