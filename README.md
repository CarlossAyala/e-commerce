# E-Commerce <!-- omit from toc -->

This repository contains a demonstration project of an e-commerce application developed with Vite/React for the front-end and Node/Express for the back-end. The goal is to showcase my (poor) skills by building a web application.

## Features

The application includes the following features:

- User authentication
- Product catalog management
- Order management
- Payment processing
- Inventory management
- Category management
- Email notifications
- Light/Dark mode

## Technologies Used

The application is built using the following technologies:

### Frontend

- Vite
- React
- ReactQuery
- Tailwind CSS
- ShadCN
- Yup
- Heroicons
- React Hook Form

### Backend

- Node.js
- Express
- Docker
- MySQL
- Redis
- Resend
- BullMQ
- Cloudinary
- Joi
- JsonWebToken
- Multer
- Sequelize
- Stripe
- Winston
- Handlebars

## Getting Started

To get started with the project, follow these steps:

### frontend

```sh
# Move to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### backend

#### Installation

```sh
# Move to the backend directory
cd backend

# Install dependencies
npm install
```

#### Environment

```sh
# Create a .env file with the environment variables
cp .env.example .env
```

- `NODE_ENV`: The environment variable to set the node environment.
- `PORT`: The port to run the application on.
- `CLIENT_URL`: The URL of the client application.
- `AUTH_SALT`: The salt to use for hashing the user passwords.
- `ACCESS_TOKEN_SECRET`: The secret to use for signing the access tokens.
- `ACCESS_TOKEN_EXPIRE`: The expiration time for access tokens in seconds.
- `REFRESH_TOKEN_SECRET`: The secret to use for signing the refresh tokens.
- `REFRESH_TOKEN_EXPIRE`: The expiration time for refresh tokens in seconds.
- `ADMIN_NAME`: The name of the admin user.
- `ADMIN_LAST_NAME`: The last name of the admin user.
- `ADMIN_EMAIL`: The email of the admin user.
- `ADMIN_PASSWORD`: The password of the admin user.
- `SELLER_PASSWORD`: The password of the seller user.
- `STRIPE_SK_TEST`: The test secret key for Stripe.
- `DB_USER`: The username for the database.
- `DB_USER_PASSWORD`: The password for the database.
- `DB_ROOT_PASSWORD`: The root password for the database.
- `DB_HOST`: The host for the database.
- `DB_DATABASE`: The name of the database.
- `DB_PORT`: The port for the database.
- `CLOUDINARY_CLOUD_NAME`: The name of the Cloudinary account.
- `CLOUDINARY_API_KEY`: The API key for the Cloudinary account.
- `CLOUDINARY_API_SECRET`: The API secret for the Cloudinary account.
- `RESEND_API_KEY`: The API key for the Resend service.
- `REDIS_HOST`: The host for the Redis server.
- `REDIS_PORT`: The port for the Redis server.
- `LOGGER_LEVEL`: The level of logging to use.

#### Docker

```sh
# Run the application in Docker
docker compose up -d
```

#### Database

```sh
# Create the database
npm run db:create

# Migrate the database
npm run migrate:up

# Seed the database
npm run seed:up
```

#### Development Server

```sh
# Start the development server
npm run dev
```

#### Production Server

```sh
# Start the production server
npm run start
```

## Contact

If you have any questions or need assistance, feel free to contact me at [infocarlosayala@gmail.com](mailto:infocarlosayala@gmail.com).
