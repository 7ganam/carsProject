import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import mongoose, { Schema } from "mongoose";

import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export const ProductZodSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
});

export type IProduct = z.infer<typeof ProductZodSchema> & {
  _id: string;
};

const ProductMongooseSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<IProduct>("Product", ProductMongooseSchema);

// Input Validation for 'GET products/:id' endpoint
export const GetProductSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
