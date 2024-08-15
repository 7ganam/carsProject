import type { IProduct } from "@/api/product/productModel";
import productModel from "@/api/product/productModel";

export class ProductRepository {
  async findAllAsync(): Promise<IProduct[]> {
    const products = await productModel.find();
    return products;
  }

  async findByIdAsync(id: number): Promise<IProduct | null> {
    const product = await productModel.findById(id);
    return product;
  }
}
