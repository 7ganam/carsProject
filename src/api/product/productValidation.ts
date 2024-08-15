import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";
import { IProductSchema } from "./productModel";

// Input Validation for 'GET products/:id' endpoint
export const GetProductSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const CreateProductSchema = z.object({
  body: z.array(
    IProductSchema.extend({
      _id: z.string().optional(),
    })
  ),
});

export const UpdateProductSchema = z.object({
  params: z.object({ id: commonValidations.id }),
  body: IProductSchema.partial(), //make all the fields optional
});

export const DeleteProductSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
