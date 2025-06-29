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

4. Create Tables on Redis<br>

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

5. Using whatever methods you like, inject the following addresses into Redis Database after you've created the tables above:<br>
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

6. Using whatever methods you like, inject the following properties into Redis Database after you've created the tables above:<br>
<pre><code>
{
    "property": {
        "property_id": "bc71df42-75fa-49d8-ac3c-eb0796d4e909",
        "created_at": "2024-10-11T16:40:00.031Z",
        "updated_at": "2024-10-11T16:40:00.031Z",
        "address": "123 Maple Avenue",
        "city": "Riverdale",
        "state": "CA",
        "postal_code": "90210",
        "country": "USA",
        "property_type": "condo",
        "bedrooms": 3,
        "bathrooms": 2,
        "area": "1200.00",
        "updatedAt": "2024-10-11T16:40:00.031Z",
        "createdAt": "2024-10-11T16:40:00.031Z"
    }
}
{
    "property": {
        "property_id": "6fc981c4-a154-4dd3-a287-6c511fc6ab83",
        "created_at": "2024-10-11T16:42:59.230Z",
        "updated_at": "2024-10-11T16:42:59.230Z",
        "address": "456 Oak Street",
        "city": "Hillsborough",
        "state": "NJ",
        "postal_code": "08844",
        "country": "USA",
        "property_type": "townhouse",
        "bedrooms": 4,
        "bathrooms": 3,
        "area": "1800.00",
        "updatedAt": "2024-10-11T16:42:59.230Z",
        "createdAt": "2024-10-11T16:42:59.230Z"
    }
}
{
    "property": {
        "property_id": "84ec21c9-7fb5-455b-9b17-e2477639cbbc",
        "created_at": "2024-10-11T16:43:56.998Z",
        "updated_at": "2024-10-11T16:43:56.998Z",
        "address": "789 Pine Lane",
        "city": "Lakeside",
        "state": "IL",
        "postal_code": "60045",
        "country": "USA",
        "property_type": "single-family home",
        "bedrooms": 5,
        "bathrooms": 4,
        "area": "2500.00",
        "updatedAt": "2024-10-11T16:43:56.998Z",
        "createdAt": "2024-10-11T16:43:56.998Z"
    }
}
{
    "property": {
        "property_id": "bc860d38-97a3-4f3a-b74b-898881c5c99f",
        "created_at": "2024-10-11T16:44:45.655Z",
        "updated_at": "2024-10-11T16:44:45.655Z",
        "address": "321 Birch Road",
        "city": "Greenville",
        "state": "SC",
        "postal_code": "29601",
        "country": "USA",
        "property_type": "studio",
        "bedrooms": 1,
        "bathrooms": 1,
        "area": "450.00",
        "updatedAt": "2024-10-11T16:44:45.655Z",
        "createdAt": "2024-10-11T16:44:45.655Z"
    }
}
{
    "property": {
        "property_id": "d0e41d97-e56d-4eb1-8e7f-4197a2557117",
        "created_at": "2024-10-11T16:45:36.523Z",
        "updated_at": "2024-10-11T16:45:36.523Z",
        "address": "654 Cedar Boulevard",
        "city": "Springfield",
        "state": "MO",
        "postal_code": "65807",
        "country": "USA",
        "property_type": "duplex",
        "bedrooms": 2,
        "bathrooms": 1,
        "area": "800.00",
        "updatedAt": "2024-10-11T16:45:36.523Z",
        "createdAt": "2024-10-11T16:45:36.523Z"
    }
}
</code></pre>

7. Using whatever methods you like, inject the following listings into Redis Database after you've created the tables above:<br>
<pre><code>
{
  "price": 850000.00,
  "is_for_sale": true,
  "description": "Modern 3-bedroom condo located in a prime area of Riverdale, with amenities like a pool and gym.",
  "available_from": "2024-11-15T00:00:00.000Z",
  "property_id": "bc71df42-75fa-49d8-ac3c-eb0796d4e909"
}
{
  "price": 550000.00,
  "is_for_sale": true,
  "description": "Spacious 4-bedroom townhouse in Hillsborough, featuring a private garage and a cozy patio.",
  "available_from": "2024-12-01T00:00:00.000Z",
  "property_id": "6fc981c4-a154-4dd3-a287-6c511fc6ab83"
}
{
  "price": 950000.00,
  "is_for_sale": true,
  "description": "Luxurious 5-bedroom single-family home in Lakeside with a large backyard and modern interior design.",
  "available_from": "2025-01-01T00:00:00.000Z",
  "property_id": "84ec21c9-7fb5-455b-9b17-e2477639cbbc"
}
{
  "price": 200000.00,
  "is_for_sale": true,
  "description": "Cozy 1-bedroom studio in the heart of Greenville, perfect for a small family or a single professional.",
  "available_from": "2024-10-25T00:00:00.000Z",
  "property_id": "bc860d38-97a3-4f3a-b74b-898881c5c99f"
}
{
  "price": 400000.00,
  "is_for_sale": true,
  "description": "Charming 2-bedroom duplex located in Springfield with modern amenities and a fenced-in yard.",
  "available_from": "2024-11-10T00:00:00.000Z",
  "property_id": "d0e41d97-e56d-4eb1-8e7f-4197a2557117"
}
</code></pre>
