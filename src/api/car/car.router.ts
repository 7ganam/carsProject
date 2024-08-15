import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ICarSchema } from "@/api/car/car.model";
import { validateRequest } from "@/common/utils/httpHandlers";
import { carController } from "./car.controller";

export const carRegistry = new OpenAPIRegistry();
export const carRouter: Router = express.Router();

//------------------------------------ testing  cheerio ------------------------------------------
carRegistry.register("Car", ICarSchema);
carRegistry.registerPath({
  method: "get",
  path: "/cars/test",
  tags: ["Car"],
  responses: createApiResponse(z.any(), "Success"),
});

carRouter.get("/test", carController.testCheerio);
