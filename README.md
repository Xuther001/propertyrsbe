# PropertyRS Setup & Usage Guide

Backend (PropertyrsBE) Setup

1. Clone this repository: git clone https://github.com/Xuther001/propertyrsbe.git

2. Create a .env file in propertyrsbe/util/ <br>
   Add the following to the .env file:
<pre><code>
JWT_SECRET=your-jwt-secret-key
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-aws-region
AWS_S3_BUCKET_NAME=your-bucket-name
</code></pre>

3. Create Tables on Redis<br>

Create the Users Table
<pre><code>
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
</code></pre>
Create the Properties Table
<pre><code>
CREATE TABLE properties (
    property_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    property_type VARCHAR(100) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    area DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
</code></pre>
Create the Listings Table
<pre><code>
CREATE TABLE listings (
    listing_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    price DECIMAL(10, 2) NOT NULL,
    is_for_sale BOOLEAN NOT NULL,
    description TEXT,
    available_from TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    property_id UUID REFERENCES properties(property_id) ON DELETE CASCADE
);
</code></pre>
Create the User-Property Association Table
<pre><code>
CREATE TABLE user_properties (
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(property_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, property_id)
);
</code></pre>
Create the Reviews Table
<pre><code>
CREATE TABLE reviews (
    review_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(property_id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
</code></pre>

3. Finally deploy to AWS
