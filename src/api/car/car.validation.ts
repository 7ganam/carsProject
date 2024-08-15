// import { z } from "zod";
// import { commonValidations } from "@/common/utils/commonValidation";
// import { ICarSchema } from "./car.model";

// export const GetCarSchema = z.object({
//   params: z.object({ id: commonValidations.id }),
// });

// export const CreateCarSchema = z.object({
//   body: z.array(
//     ICarSchema.extend({
//       _id: z.string().optional(),
//     })
//   ),
// });

// export const UpdateCarSchema = z.object({
//   params: z.object({ id: commonValidations.id }),
//   body: ICarSchema.partial(), //make all the fields optional
// });

// export const DeleteCarSchema = z.object({
//   params: z.object({ id: commonValidations.id }),
// });
