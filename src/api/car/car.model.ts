import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import mongoose, { Schema, Model } from "mongoose";

import { z } from "zod";

extendZodWithOpenApi(z);

//first we create an I schema. which is a type representing what will the server return when a client is asking for a car
export const ICarSchema = z.object({
  _id: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number(),
  price: z.number().optional(),
});

//then we infer an I type from the I schema
export type ICar = z.infer<typeof ICarSchema>;

//then we define the mongoose schema. it usually has the same structure as the I schema (unfortunately, we can't infer it from the I schema)
const CarMongooseSchema: Schema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: false },
});

//then we create the model. we have to pass a TS type to describe the type of the document.
// mongoose will use this type without checking if it actually matches the document. so if your I type is out of sync from the mongoose schema. mongoose will give you the wrong type.
const CarModel = mongoose.model<ICar>("Car", CarMongooseSchema);
export default CarModel;

type CarModelType = Model<ICar>;
export { CarModelType };
