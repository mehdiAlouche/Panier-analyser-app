# Panier Analyser Dashboard Application

A modern sales dashboard built with Vue 3, TypeScript, and Vite, featuring real-time data visualization .

## Features

- **Authentication System**
  - Secure login page
  - Protected routes
  - User session management

- **Dashboard Overview**
  - Total sales calculation and display
  - Top 5 best-selling products
  - Sales distribution by category
  - Comprehensive product listing table

- **Data Visualization**
  - Pie chart for category distribution
  - Bar chart for product sales
  - Interactive charts using Chart.js

- **Time Period Filtering**
  - Last 7 days
  - Last 30 days
  - Last 12 months
  - All-time view

- **Modern UI Features**
  - Dark/Light mode toggle
  - Responsive sidebar navigation
  - User profile dropdown
  - Loading spinners for API calls

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sales-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/         # Reusable Vue components
│   ├── common/        # Shared components (LoadingSpinner, etc.)
│   └── layout/        # Layout components (Sidebar, Topbar)
├── stores/            # Pinia stores for state management
├── views/             # Page components
├── plugins/           # Plugin configurations
├── types/             # TypeScript type definitions
```

## Usage

1. Login to the application:
   - Username: testuser
   - Password: testpassword

2. Navigate through the dashboard using the sidebar menu

3. Use the time filter dropdown to view data for different periods

4. logout through the profile dropdown

## Technical Stack

- Vue 3 - Progressive JavaScript Framework
- TypeScript - Type-safe JavaScript
- Vite - Next Generation Frontend Tooling
- Pinia - Vue Store Management
- Chart.js - Data Visualization
- Vue Router - Application Routing
- Axios - HTTP Client
- date-fns - Date Manipulation

## Development

- Run tests:
  ```bash
  npm run test
  ```

- Preview production build:
  ```bash
  npm run preview
  ```
