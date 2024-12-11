// src/routes/analytics.ts

import { Router } from 'express';
import { getCategorySales, getSalesPerProduct, getTotalSales, getTrendingProducts } from '../controllers/analyticsController';

const router = Router();

/**
 * @swagger
 * /analytics/total-sales:
 *   get:
 *     summary: Get total sales for a selected period
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for sales period
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for sales period
 *     responses:
 *       200:
 *         description: Total sales amount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSales:
 *                   type: number
 *       500:
 *         description: Server error
 */
router.get('/total-sales', getTotalSales);

/**
 * @swagger
 * /analytics/trending:
 *   get:
 *     summary: Get top 5 trending products
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of trending products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productID:
 *                     type: string
 *                   productName:
 *                     type: string
 *                   totalQuantity:
 *                     type: number
 *                   totalRevenue:
 *                     type: number
 *       500:
 *         description: Server error
 */
router.get('/trending', getTrendingProducts);

/**
 * @swagger
 * /analytics/category-sales:
 *   get:
 *     summary: Get sales distribution by category
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sales distribution by category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   totalSales:
 *                     type: number
 *                   totalQuantity:
 *                     type: number
 *                   percentage:
 *                     type: number
 *       500:
 *         description: Server error
 */
router.get('/category-sales', getCategorySales);

/**
 * @swagger
 * /analytics/sales-per-product:
 *   get:
 *     summary: Get sales data per product
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sales data for each product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ProductID:
 *                     type: string
 *                   ProductName:
 *                     type: string
 *                   totalSales:
 *                     type: number
 *                   totalQuantity:
 *                     type: number
 *       500:
 *         description: Server error
 */
router.get('/sales-per-product', getSalesPerProduct);

export default router;
