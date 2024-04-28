# Library API with Express, TypeScript, TypeORM

A simple library API built with the Express framework, TypeScript, and TypeORM.

## Installation and Usage

### 1. Clone the Repository

Clone this repository to your local machine:

git clone https://github.com/bekarserif/library-api-with-express-typescript-typeorm.git

cd library-api-with-express-typescript-typeorm

### 2. Set Up PostgreSQL Database

The application uses a PostgreSQL database. You have two options:

- **Option 1:** Use your local PostgreSQL database.
- **Option 2:** Create a PostgreSQL database using the provided Docker Compose configuration.

If you choose Option 2, run the following command in the `/docker` folder:

docker-compose -f docker-compose-postgres.yml up -d

### 3. Configure Environment Variables

Copy the `example.env` file and rename it to `.env`. Modify the `.env` file according to your environment variables. Ensure that the configurations match your PostgreSQL setup.

### 4. Start the Application

You can start the application using either `ts-node` or `nodemon`:

**With ts-node:**

npm run start

**With nodemon:**

npm run dev

### 5. Database Setup

If you're using the provided Docker Compose setup, a `libraryDB` will be automatically created within PostgreSQL. However, if you're using a different PostgreSQL environment, ensure to create the database. Run the following command:

npm run db:create

This command initializes the database. Without it, the application might crash because TypeORM won't be able to connect to a non-existing database specified in the configuration.

### 6. Database Seeding

When the application boots in the development environment, the database will be automatically seeded with seeders provided in the `src/seeders` directory. Optionally, you can manually seed the database by running:

npm run seed:run

### 7. Testing

This repository includes tests using Jest and Supertest packages. You can run the tests with:

npm run test

### 8. Cleaning Up

If you wish to drop the database after running tests or when you're done with the application, you can use:

npm run db:drop
