import sequelize from './config/db.js';
import initUserModel from './models/User.js';
import initFavoriteModel from './models/Favorite.js';
import initListingModel from './models/Listing.js';
import initPropertyModel from './models/Property.js';
import initReviewModel from './models/Review.js';

const User = initUserModel(sequelize);
const Property = initPropertyModel(sequelize);
const Listing = initListingModel(sequelize);
const Favorite = initFavoriteModel(sequelize);
const Review = initReviewModel(sequelize);

User.associate({ Property, Review, Favorite });
Property.associate({ User, Review, Listing });
Listing.associate({ Property });
Review.associate({ User, Property });
Favorite.associate({ User, Property });

const models = { User, Favorite, Listing, Property, Review };

export default models;