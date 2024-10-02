const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM your_table_name');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});