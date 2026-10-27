'use server'

import { auth } from "@/src/auth.config"
import prisma from "@/src/lib/prisma"

export const getOrdersByUsers = async () => {
    const session = await auth()

    if(!session?.user){
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            orderAddresses: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    })

    return {
        ok: true,
        orders: orders
    }
}