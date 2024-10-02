import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import initUserModel from './models/user.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const User = initUserModel(sequelize);

sequelize.sync()
  .then(() => {
    console.log('Tables created successfully!');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });

app.get('/api/data', async (req, res) => {
  try {
    const result = await User.findAll();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});