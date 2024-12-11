# Outil Simplifié d'Analyse des Paniers d'Achat

## Description
This project is designed to provide e-commerce administrators with insights into their sales data. It includes a Vue3 frontend for displaying dashboards and a Node.js backend for data processing and API management.

## Features
### Frontend (Vue3)
- Dashboard with key metrics:
  - Total sales.
  - Top 5 most sold products.
  - Sales distribution by category.
  - Detailed product table.
- Interactive visualizations:
  - Bar charts and pie charts for sales data.
  - Histogram for product-specific sales.
- Filters:
  - Time-based filters for data (last 7 days, 30 days, 12 months).

### Backend (Node.js + TypeScript)
- REST API endpoints:
  - `GET /analytics/total_sales`: Fetch total sales.
  - `GET /analytics/trending_products`: Fetch top 3 trending products.
  - `GET /analytics/category_sales`: Fetch sales distribution by category.
  - `GET /products`: Fetch all product details.
- Data processing:
  - Aggregate and calculate sales metrics.
- Database:
  - MongoDB integration.
  - Script for seeding data from CSV files.

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- MongoDB database setup.
- Vue CLI for frontend development.

### Installation
#### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

#### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Seed the database with data from CSV files:
   ```bash
   npx ts-node src/utils/databaseSeeder.ts
   ```

## API Documentation

The API documentation is available via Swagger at:

- **[Swagger API Docs](http://localhost:3000/api-docs/)**


"# panier-analyser-app" 
