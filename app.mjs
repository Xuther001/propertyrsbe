import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import models from './index.js';
import userRoutes from './routes/userRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import propertyImageRoutes from './routes/propertyImageRoutes.js';
import { loginUser } from './controllers/UserController.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const { User } = models;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tables created successfully!');
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });

app.use('/api/favorites', favoriteRoutes);
app.use('/api/login', loginUser);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/property', propertyRoutes);
app.use('/api/propertyimages', propertyImageRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});