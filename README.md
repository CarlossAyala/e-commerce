# E-Commerce <!-- omit from toc -->

This repository contains a demonstration project of an e-commerce application developed with Vite/React for the front-end and Node/Express for the back-end. The goal is to showcase my (poor) skills by building a web application.

## Project Structure

The project is organized into the following directories:

### frontend

This is organized to follow the [Screaming Architecture or Group by Features](https://profy.dev/article/react-folder-structure) folder structure:

- `/src/apps/<admin|e-commerce|seller>`: Contains the React components for the different parts of the each application.
- `/src/assets`: Contains the static assets for the entire application.
- `/src/components`: Temporary components that are used across the different applications. Need to be moved to `/src/shared`.
- `/src/configs`: Contains the configuration files for the different applications.
- `/src/libs`: Contains the shared libraries used across the different applications.
- `/src/shared`: Contains the shared contexts, components, hooks, utils, etc, used across the different applications.
- `/src/utils`: Contains the utility functions used across the different applications. Maybe move to `/src/shared`.
- `/src/providers`: Contains the providers for the different contexts used across the different applications.
- `/src/routes`: Contains the routes for the different applications.
- `/src/app.js`: Place to call the routes and providers for the application.
- `/src/main.js`: The entry point for the application.
  
### backend

This do not follow any specific folder structure, i think, it's just a simple Node/Express application.

- `/logs`: Contains the logs about the application.
- `/public`: Contains the static assets for the entire application.
- `/src/api<admin|auth|e-commerce|seller|shared>`: Each API endpoint is a folder with the controllers, middlewares and routes and schemas.
- `/src/api/routes.js`: The entry point for the API routes configuration.
- `/src/config`: Contains the environment variables and configuration used by the application.
- `/src/db`: Contains the databases used by the application.
- `/src/jobs`: Contains the background jobs used by the application.
- `/src/middlewares`: Contains the middlewares used by the application.
- `/src/services`: Contains the services used by the application.
- `/src/utils`: Contains the utility functions used by the application.
- `/src/app.js`: The entry point for the application.

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

## Contact

If you have any questions or need assistance, feel free to contact me at [infocarlosayala@gmail.com](mailto:infocarlosayala@gmail.com).
