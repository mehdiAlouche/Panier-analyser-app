import { Request, Response } from 'express';
import Sale from '../models/sales';

// Calculate total sales for a selected period
export const getTotalSales = async (req: Request, res: Response) => {
  const { startDate } = req.query;

  try {
    const filter: any = {};
    if (startDate) {
      filter.Date = { $gte: new Date(startDate as string) };
    }

    const totalSales = await Sale.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$TotalAmount' },
        },
      },
    ]);

    res.json({ totalSales: totalSales[0]?.totalAmount || 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total sales', error });
  }
};
// Get top 5 trending products
export const getTrendingProducts = async (req: Request, res: Response) => {
  const { startDate } = req.query;

  try {
    const filter: any = {};
    if (startDate) {
      filter.Date = { $gte: new Date(startDate as string) };
    }

    const trendingProducts = await Sale.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$ProductID',
          totalQuantity: { $sum: '$Quantity' },
          totalRevenue: { $sum: '$TotalAmount' },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'ProductID',
          as: 'productDetails',
        },
      },
      {
        $project: {
          productID: '$_id',
          totalQuantity: 1,
          totalRevenue: 1,
          productName: { $arrayElemAt: ['$productDetails.ProductName', 0] },
        },
      },
    ]);

    res.json(trendingProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending products', error });
  }
};
// Get category sales distribution
export const getCategorySales = async (req: Request, res: Response) => {
  const { startDate } = req.query;
  try {
    const filter: any = {};
    if (startDate) {
      filter.Date = { $gte: new Date(startDate as string) };
    }
    
    // Calculer le total des ventes
    const totalSalesResult = await Sale.aggregate([
      { $match: filter },
      { $group: { _id: null, totalSales: { $sum: '$TotalAmount' } } }
    ]);
    const totalSales = totalSalesResult[0]?.totalSales || 0;

    const categorySales = await Sale.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: 'products',
          localField: 'ProductID',
          foreignField: 'ProductID',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $group: {
          _id: '$productDetails.Category',
          totalSales: { $sum: '$TotalAmount' },
          totalQuantity: { $sum: '$Quantity' },
        },
      },
      {
        $project: {
          category: '$_id',
          totalSales: 1,
          totalQuantity: 1,
          percentage: {
            $multiply: [
              { $divide: ['$totalSales', totalSales] },
              100,
            ],
          },
        },
      },
    ]);

    res.json(categorySales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category sales', error });
  }
};
// Get Sales Per Product
export const getSalesPerProduct = async (req: Request, res: Response) => {
  const { startDate } = req.query;
  try {
    const filter: any = {};
    if (startDate) {
      filter.Date = { $gte: new Date(startDate as string) };
    }
    const salesPerProduct = await Sale.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'ProductID',
          foreignField: 'ProductID',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $group: {
          _id: '$ProductID',
          ProductName: { $first: '$productDetails.ProductName' },
          totalSales: { $sum: { $multiply: ['$Quantity', '$productDetails.Price'] } },
          totalQuantity: { $sum: '$Quantity' },
        },
      },
    ]);

    res.json(salesPerProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error calculating sales per product', error });
  }
};

