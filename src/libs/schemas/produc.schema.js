import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3).max(50),

  brand: z.string().optional(),

  category: z.string(),

  price: z.string().min(1).max(1000000),

  stock: z.string().default(1)
});