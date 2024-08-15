import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly responseObject: T;
  readonly statusCode: number;
  readonly stackTrace: string;

  private constructor(
    success: boolean,
    message: string,
    responseObject: T,
    statusCode: number,
    stackTrace: string = ""
  ) {
    this.success = success;
    this.message = message;
    this.responseObject = responseObject;
    this.statusCode = statusCode;
    this.stackTrace = stackTrace;
  }

  static success<T>(
    message: string,
    responseObject: T,
    statusCode: number = StatusCodes.OK
  ) {
    return new ServiceResponse(true, message, responseObject, statusCode);
  }

  static failure<T>(
    message: string,
    responseObject: T,
    statusCode: number = StatusCodes.BAD_REQUEST,
    stackTrace: string = ""
  ) {
    return new ServiceResponse(
      false,
      message,
      responseObject,
      statusCode,
      stackTrace
    );
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    responseObject: dataSchema.optional(),
    statusCode: z.number(),
    stackTrace: z.string().optional(),
  });
