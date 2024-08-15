import type { Request, RequestHandler, Response } from "express";

import { carService } from "@/api/car/car.service";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class CarController {
  public testCheerio: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await carService.test();
    return handleServiceResponse(serviceResponse, res);
  };
}

export const carController = new CarController();
