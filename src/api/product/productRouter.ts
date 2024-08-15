import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
  CreateProductSchema,
  GetProductSchema,
} from "@/api/product/productValidation";
import { IProductSchema } from "@/api/product/productModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { productController } from "./productController";

export const productRegistry = new OpenAPIRegistry();
export const productRouter: Router = express.Router();

//------------------------------------ get all ------------------------------------------
productRegistry.register("Product", IProductSchema);
productRegistry.registerPath({
  method: "get",
  path: "/products",
  tags: ["Product"],
  responses: createApiResponse(z.array(IProductSchema), "Success"),
});

productRouter.get("/", productController.getProducts);

//------------------------------------ get one by id ------------------------------------------
productRegistry.registerPath({
  method: "get",
  path: "/products/{id}",
  tags: ["Product"],
  request: { params: GetProductSchema.shape.params },
  responses: createApiResponse(IProductSchema, "Success"),
});

productRouter.get(
  "/:id",
  validateRequest(GetProductSchema),
  productController.getProduct
);

//------------------------------------ create ------------------------------------------
productRegistry.registerPath({
  method: "post",
  path: "/products",
  tags: ["Product"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.array(
            IProductSchema.extend({ _id: z.string().optional() })
          ),
        },
      },
    },
  },
  responses: createApiResponse(z.array(IProductSchema), "Success"),
});

productRouter.post(
  "/",
  validateRequest(CreateProductSchema),
  productController.createProduct
);
