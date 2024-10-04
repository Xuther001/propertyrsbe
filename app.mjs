import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import models from './index.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const { User } = models;

sequelize.sync()
  .then(() => {
    console.log('Tables created successfully!');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});