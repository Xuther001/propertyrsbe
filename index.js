import sequelize from '../burrowbunny/config/db.js';
import initUserModel from './models/User.js';
import initFavoriteModel from './models/Favorite.js';
import initListingModel from './models/Listing.js';
import initPropertyModel from './models/Property.js';
import initReview from './models/Review.js';

const User = initUserModel(sequelize);
const Favorite = initFavoriteModel(sequelize);
const Listing = initListingModel(sequelize);
const Property = initPropertyModel(sequelize);
const Review = initReview(sequelize);

const models = { User, Favorite, Listing, Property, Review };

export default models;