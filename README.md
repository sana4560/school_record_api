# School Management API

This is a backend application built with **Node.js**, **Express.js**, and **MySQL**. It provides an API that can be accessed using **Postman** for managing school data. The API allows users to add new schools and list all existing schools, sorted by proximity.

## Features

- **POST /addSchool**: Add a new school with details like name, address, latitude, and longitude.
- **GET /listSchools**: Retrieve a list of all schools, sorted by distance from a user's location.

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for Node.js
- **MySQL**: Database for storing school data

## Setup Instructions

### 1. Clone the repository

Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/school-management-api.git
