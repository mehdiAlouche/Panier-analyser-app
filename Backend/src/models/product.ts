// src/models/Product.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  ProductID: number;
  ProductName: string;
  Category: string;
  Price: number;
}

const ProductSchema = new Schema({
  ProductID: { type: Number, required: true, unique: true },
  ProductName: { type: String, required: true },
  Category: { type: String, required: true },
  Price: { type: Number, required: true }
},{ versionKey: false });

export default mongoose.model<IProduct>('Product', ProductSchema);
