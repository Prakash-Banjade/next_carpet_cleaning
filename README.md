# Rebel Cleaning Backend Documentation

Welcome to the documentation for Rebel Cleaning's backend application. This application serves as the backend for managing content related to Rebel Cleaning, an Australian-based carpet cleaning company.

## Table of Contents
- [Rebel Cleaning Backend Documentation](#rebel-cleaning-backend-documentation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Routes](#routes)
    - [Authentication Routes](#authentication-routes)
    - [Content Management Routes](#content-management-routes)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

The Rebel Cleaning backend application is built using Nest.js, a progressive Node.js framework. It provides a set of routes for managing content such as services, testimonials, and blog posts for Rebel Cleaning's website.

## Routes

### Authentication Routes

- **POST /auth/login**: Endpoint for user authentication. Users can log in with their credentials (username/email and password).
- **POST /auth/register**: Endpoint for user registration. New users can create an account by providing necessary details such as username, email, and password.
- **POST /auth/logout**: Endpoint for user logout. Users can invalidate their current session.

### Content Management Routes

- **GET /services**: Retrieve all carpet cleaning services offered by Rebel Cleaning.
- **GET /services/:id**: Retrieve details of a specific carpet cleaning service by its ID.
- **POST /services**: Create a new carpet cleaning service.
- **PUT /services/:id**: Update details of a specific carpet cleaning service.
- **DELETE /services/:id**: Delete a carpet cleaning service by its ID.
- **GET /testimonials**: Retrieve all testimonials from satisfied customers.
- **GET /testimonials/:id**: Retrieve details of a specific testimonial by its ID.
- **POST /testimonials**: Add a new testimonial from a satisfied customer.
- **PUT /testimonials/:id**: Update details of a specific testimonial.
- **DELETE /testimonials/:id**: Delete a testimonial by its ID.
- **GET /blog**: Retrieve all blog posts related to carpet cleaning tips, news, and updates.
- **GET /blog/:id**: Retrieve details of a specific blog post by its ID.
- **POST /blog**: Create a new blog post.
- **PUT /blog/:id**: Update details of a specific blog post.
- **DELETE /blog/:id**: Delete a blog post by its ID.

## Setup

To set up the Rebel Cleaning backend application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Set up environment variables such as database connection details, JWT secret, etc., in a `.env` file.
5. Run `npm run start:dev` to start the development server.

## Usage

Once the server is up and running, you can start making HTTP requests to the defined routes using tools like Postman or directly from your frontend application. Ensure that you have appropriate permissions and authentication tokens for accessing protected routes.

## Contributing

This project is not open to external contributions. Only authorized developers within Rebel Cleaning have access to modify or extend the backend application. If you have suggestions or improvements, please contact the development team at [Rebel Cleaning](mailto:info@rebelcleaning.com.au) for consideration.

## License

This project is proprietary to Rebel Cleaning. Unauthorized use, reproduction, or distribution of this codebase is prohibited. For inquiries regarding the use of this software, please contact [Rebel Cleaning](mailto:info@rebelcleaning.com.au).
