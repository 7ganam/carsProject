import type { Request, RequestHandler, Response } from "express";

import { productService } from "@/api/product/productService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class ProductController {
  public getProducts: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await productService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getProduct: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const serviceResponse = await productService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const productController = new ProductController();
