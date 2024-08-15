import { StatusCodes } from "http-status-codes";
import axios from "axios";

import type { ICar } from "@/api/car/car.model";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import CarModel, { CarModelType } from "@/api/car/car.model";
import * as cheerio from "cheerio";

export class CarService {
  private carRepository: CarModelType;

  constructor(repository: CarModelType = CarModel) {
    this.carRepository = repository;
  }

  async test(): Promise<ServiceResponse<any | null>> {
    try {
      const url =
        "https://eg.hatla2ee.com/ar/car/used-prices/hyundai/tucson/2020";
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const avpColorContent = $(".AvPcolor").first().text();
      console.log(
        'Content of first element with class "AvPcolor":',
        avpColorContent
      );

      return ServiceResponse.success("Cheerio test completed", avpColorContent);
    } catch (ex) {
      const errorMessage = `Error testing cheerio: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while  testing cheerio.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
        JSON.stringify(ex)
      );
    }
  }
}

export const carService = new CarService();
