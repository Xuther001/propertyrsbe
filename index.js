import sequelize from './config/db.js';
import initUserModel from './models/User.js';
import initFavoriteModel from './models/Favorite.js';
import initListingModel from './models/Listing.js';
import initPropertyModel from './models/Property.js';
import initReviewModel from './models/Review.js';
import initPropertyImageModel from './models/PropertyImage.js';
import UserProperty from './models/UserProperty.js';

const User = initUserModel(sequelize);
const Property = initPropertyModel(sequelize);
const Listing = initListingModel(sequelize);
const Favorite = initFavoriteModel(sequelize);
const Review = initReviewModel(sequelize);
const PropertyImage = initPropertyImageModel(sequelize);

User.associate({ Property, Review, Favorite, UserProperty });
Property.associate({ User, Review, Listing, UserProperty });
Listing.associate({ Property });
Review.associate({ User, Property });
Favorite.associate({ User, Property, Listing });
PropertyImage.associate({ Property });

const models = { User, Property, Listing, Favorite, Review, PropertyImage, UserProperty };

export default models;