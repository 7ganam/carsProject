import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetProductSchema } from "@/api/product/productValidation";
import { ProductZodSchema } from "@/api/product/productModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { productController } from "./productController";

export const productRegistry = new OpenAPIRegistry();
export const productRouter: Router = express.Router();

productRegistry.register("Product", ProductZodSchema);

productRegistry.registerPath({
  method: "get",
  path: "/products",
  tags: ["Product"],
  responses: createApiResponse(z.array(ProductZodSchema), "Success"),
});

productRouter.get("/", productController.getProducts);

productRegistry.registerPath({
  method: "get",
  path: "/products/{id}",
  tags: ["Product"],
  request: { params: GetProductSchema.shape.params },
  responses: createApiResponse(ProductZodSchema, "Success"),
});

productRouter.get(
  "/:id",
  validateRequest(GetProductSchema),
  productController.getProduct
);
