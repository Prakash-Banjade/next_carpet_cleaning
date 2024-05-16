# Next Carpet Cleaning Backend Documentation

Welcome to the documentation for Next Carpet Cleaning's backend application. This application serves as the backend for managing content related to Next Carpet Cleaning, an Australian-based carpet cleaning company.

## Table of Contents
- [Next Carpet Cleaning Backend Documentation](#rebel-cleaning-backend-documentation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Routes](#routes)
    - [Authentication Routes](#authentication-routes)
    - [Content Management Routes (public)](#content-management-routes-public)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

The Next Carpet Cleaning backend application is built using Nest.js, a progressive Node.js framework. It provides a set of routes for managing content such as services, testimonials, gallery, and blog posts for Next Carpet Cleaning's website.

## Routes

### Authentication Routes

- **POST /auth/login**: Endpoint for members authentication. Members can log in with their credentials (email and password).
- **POST /members**: Endpoint for member registration. New members can create an account by providing necessary details.
- **POST /auth/logout**: Endpoint for member logout. Members can invalidate their current session.
- **POST /users/login**: Endpoint for users authentication. New users log in with their credentials.
- **POST /users**: Endpoint for users registration. New users can be created by providing necessary details.

### Content Management Routes (public)

- **GET /services**: Retrieve all carpet cleaning services offered by Next Carpet Cleaning.
- **GET /blog**: Retrieve all blog posts related to carpet cleaning tips, news, and updates.
- **GET /testimonials**: Retrieve all testimonials from satisfied customers.
- **GET /members**: Retrieve all members working at Next Carpet Cleaning.
- **GET /contact**: Retrieve the contact informations.
- **GET /faq**: Retrieve all the frequently asked questions with their answers related to Next Carpet Cleaning.
- **GET /gallery**: Retrieve gallery posts.  
And other private routes.

## Contributing

This project is not open to external contributions. Only authorized developers within Next Carpet Cleaning have access to modify or extend the backend application. If you have suggestions or improvements, please contact the development team at [Next Carpet Cleaning](mailto:rebelcleaningaus@gmail.com) for consideration.

## License

This project is proprietary to Next Carpet Cleaning. Unauthorized use, reproduction, or distribution of this codebase is prohibited. For inquiries regarding the use of this software, please contact [Next Carpet Cleaning](mailto:rebelcleaningaus@gmail.com).
