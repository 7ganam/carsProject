import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import mongoose, { Schema, Model } from "mongoose";

import { z } from "zod";

extendZodWithOpenApi(z);

//first we create an I schema. which is a type representing what will the server return when a client is asking for a product
export const IProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
});

//then we infer an I type from the I schema
export type IProduct = z.infer<typeof IProductSchema>;

//then we define the mongoose schema. it usually has the same structure as the I schema (unfortunately, we can't infer it from the I schema)
const ProductMongooseSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

//then we create the model. we have to pass a TS type to describe the type of the document.
// mongoose will use this type without checking if it actually matches the document. so if your I type is out of sync from the mongoose schema. mongoose will give you the wrong type.
const ProductModel = mongoose.model<IProduct>("Product", ProductMongooseSchema);
export default ProductModel;

type ProductModelType = Model<IProduct>;
export { ProductModelType };
