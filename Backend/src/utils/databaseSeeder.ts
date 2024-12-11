
// to run this script and seed database with data from CSV files run :  npx ts-node src/utils/databaseSeeder.ts

import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import csvParser from 'csv-parser';
import Product from '../models/product';
import Sale from '../models/sales';

// Paths to the CSV files inside the "data" folder
const PRODUCTS_CSV = path.resolve(__dirname, '../../data/products.csv');
const SALES_CSV = path.resolve(__dirname, '../../data/sales.csv');

// Function to import CSV data into JSON format
const importCSV = async (filePath: string) => {
  return new Promise<any[]>((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

// Seed database with data from CSV files
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing old data...');
    await Product.deleteMany({});
    await Sale.deleteMany({});

    // Import and insert products
    console.log('Importing products...');
    const products = await importCSV(PRODUCTS_CSV);
    await Product.insertMany(
      products.map((product) => ({
        ProductID: parseInt(product.ProductID, 10),
        ProductName: product.ProductName,
        Category: product.Category,
        Price: parseFloat(product.Price),
      }))
    );
    console.log('Products imported successfully!');

    // Import and insert sales
    console.log('Importing sales...');
    const sales = await importCSV(SALES_CSV);
    await Sale.insertMany(
      sales.map((sale) => ({
        SaleID: parseInt(sale.SaleID, 10),
        ProductID: parseInt(sale.ProductID, 10),
        Quantity: parseInt(sale.Quantity, 10),
        Date: new Date(sale.Date),
        TotalAmount: parseFloat(sale.TotalAmount),
      }))
    );
    console.log('Sales imported successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();