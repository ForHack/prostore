'use server'

import {CartItem} from "@/types";
import {formatError} from "../utils";
import {cookies} from "next/headers";
import {auth} from "@/auth";

export async function addItemToCart(data: CartItem) {
    try {
        // Check for cart cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value

        if (!sessionCartId) {
            throw new Error('Cart session not found.')
        }

        // Get session and user ID
        const session = await auth()
        const userId = session?.user?.id ? (session.user.id as string) : undefined

        console.log('userId', userId)

        return {
            success: true,
            message: 'Item added to cart',
        }
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        }
    }
}