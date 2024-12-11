// src/controllers/productsController.ts

import { Request, Response } from 'express';
import Product from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; 
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit; 

    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'sales',
          localField: 'ProductID',
          foreignField: 'ProductID',
          as: 'sales',
        },
      },
      {
        $project: {
          _id: 1,
          ProductID: 1,
          ProductName: 1,
          Category: 1,
          Price: 1,
          totalQuantity: { $sum: '$sales.Quantity' },
          totalSales: { $sum: '$sales.TotalAmount' },
        },
      },
      {
        $facet: {
          products: [
            { $skip: skip },
            { $limit: limit },
          ],
          totalProduct: [
            { $count: 'count' }
          ]
        }
      },
      {
        $unwind: {
          path: '$totalProduct',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          products: 1,
          totalProduct: { $ifNull: ['$totalProduct.count', 0] }
        }
      }
    ]);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};
