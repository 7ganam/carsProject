import { StatusCodes } from "http-status-codes";

import type { IProduct } from "@/api/product/productModel";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import ProductModel, { ProductModelType } from "@/api/product/productModel";

export class ProductService {
  private productRepository: ProductModelType;

  constructor(repository: ProductModelType = ProductModel) {
    this.productRepository = repository;
  }

  async findAll(): Promise<ServiceResponse<IProduct[] | null>> {
    try {
      const products = await this.productRepository.find();
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
        StatusCodes.INTERNAL_SERVER_ERROR,
        JSON.stringify(ex)
      );
    }
  }

  // Retrieves a single product by their ID
  async findById(id: string): Promise<ServiceResponse<IProduct | null>> {
    try {
      const product = await this.productRepository.findById(id);
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
        StatusCodes.INTERNAL_SERVER_ERROR,
        JSON.stringify(ex)
      );
    }
  }

  // Creates a new product
  async create(
    products: IProduct[]
  ): Promise<ServiceResponse<IProduct[] | null>> {
    try {
      const newProduct = await this.productRepository.create(products);
      return ServiceResponse.success<IProduct[]>(
        "Product created successfully",
        newProduct
      );
    } catch (ex) {
      const errorMessage = `Error creating product: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating product.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
        JSON.stringify(ex)
      );
    }
  }
}

export const productService = new ProductService();
