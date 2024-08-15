import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

// Input Validation for 'GET products/:id' endpoint
export const GetProductSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
