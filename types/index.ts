import {z} from "zod";
import {cartItemSchema, insertProductsSchema} from "@/lib/validators";

export type Product = z.infer<typeof insertProductsSchema> & {
    id: string;
    rating: string;
    createdAt: Date;
}

export type Cart = z.infer<typeof insertProductsSchema>
export type CartItem = z.infer<typeof cartItemSchema>