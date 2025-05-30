# Bike Servicing Management API

A backend API for managing bike service operations including customer, bike, and service record management.

## Live Backend

[https://bike-servicing-api.vercel.app](https://bike-servicing-api.vercel.app)

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

## Features

- Customer Management (CRUD operations)
- Bike Management (CRUD operations)
- Service Records Management
- Mark services as completed
- Track overdue services (older than 7 days)
- Standardized error handling

## Setup Guide

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bike-servicing-api.git
   cd bike-servicing-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and set your PostgreSQL database connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/bike_servicing_db?schema=public"
   PORT=5000
   NODE_ENV=development
   ```

4. Run Prisma migrations to create the database schema:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Customer Endpoints
- `POST /api/customers` - Create a new customer
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get a specific customer
- `PUT /api/customers/:id` - Update customer details
- `DELETE /api/customers/:id` - Delete a customer

### Bike Endpoints
- `POST /api/bikes` - Add a new bike
- `GET /api/bikes` - Get all bikes
- `GET /api/bikes/:id` - Get a specific bike

### Service Endpoints
- `POST /api/services` - Create a service record
- `GET /api/services` - Get all service records
- `GET /api/services/:id` - Get a specific service record
- `PUT /api/services/:id/complete` - Mark a service as completed
- `GET /api/services/status` - Get all overdue services (older than 7 days)

## Deployment

This API is configured for easy deployment on Vercel or similar platforms.

## Testing

A Postman collection is included in the repository for testing all endpoints.#
