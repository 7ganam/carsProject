import { StatusCodes } from "http-status-codes";

import type { IProduct } from "@/api/product/productModel";
import { ProductRepository } from "@/api/product/productRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class ProductService {
  private productRepository: ProductRepository;

  constructor(repository: ProductRepository = new ProductRepository()) {
    this.productRepository = repository;
  }

  // Retrieves all products from the database
  async findAll(): Promise<ServiceResponse<IProduct[] | null>> {
    try {
      const products = await this.productRepository.findAllAsync();
      if (!products || products.length === 0) {
        return ServiceResponse.failure(
          "No Products found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<IProduct[]>("Products found", products);
    } catch (ex) {
      const errorMessage = `Error finding all products: $${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving products.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Retrieves a single product by their ID
  async findById(id: number): Promise<ServiceResponse<IProduct | null>> {
    try {
      const product = await this.productRepository.findByIdAsync(id);
      if (!product) {
        return ServiceResponse.failure(
          "Product not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<IProduct>("Product found", product);
    } catch (ex) {
      const errorMessage = `Error finding product with id ${id}:, ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding product.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const productService = new ProductService();
