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

3. Finally deploy to AWS
