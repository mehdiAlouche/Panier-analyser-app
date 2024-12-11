import { Router } from 'express';
import { getProducts } from '../controllers/productsController';

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products with sales information
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products with sales data
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
 *                   Category:
 *                     type: string
 *                   Price:
 *                     type: number
 *                   totalQuantity:
 *                     type: number
 *                   totalSales:
 *                     type: number
 *       500:
 *         description: Server error
 */
router.get('/', getProducts);

export default router;
