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

3. Deploy to AWS

4. Create Tables on Amazon RDS<br>

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
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
</code></pre>

5. Finally, access the website through your aws provided URL.

# (Optional) You can create an account and start adding properties and list them or you can inject sample data from below

Using whatever methods you like, inject the following addresses into Amazon RDS Database after you've created the tables above:<br>
<pre><code>
{
  "address": "123 Maple Avenue",
  "city": "Riverdale",
  "state": "CA",
  "postal_code": "90210",
  "country": "USA",
  "property_type": "condo",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 1200
}
{
  "address": "456 Oak Street",
  "city": "Hillsborough",
  "state": "NJ",
  "postal_code": "08844",
  "country": "USA",
  "property_type": "townhouse",
  "bedrooms": 4,
  "bathrooms": 3,
  "area": 1800
}
{
  "address": "789 Pine Lane",
  "city": "Lakeside",
  "state": "IL",
  "postal_code": "60045",
  "country": "USA",
  "property_type": "single-family home",
  "bedrooms": 5,
  "bathrooms": 4,
  "area": 2500
}
{
  "address": "321 Birch Road",
  "city": "Greenville",
  "state": "SC",
  "postal_code": "29601",
  "country": "USA",
  "property_type": "studio",
  "bedrooms": 1,
  "bathrooms": 1,
  "area": 450
}
{
  "address": "654 Cedar Boulevard",
  "city": "Springfield",
  "state": "MO",
  "postal_code": "65807",
  "country": "USA",
  "property_type": "duplex",
  "bedrooms": 2,
  "bathrooms": 1,
  "area": 800
}
</code></pre>
