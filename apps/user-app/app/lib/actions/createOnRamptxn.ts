"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider: string, amount: number) {
    // Ideally the token should come from the banking provider (hdfc/axis),will do it later  
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    if (!userId) {
        return {
            message: "Unauthenticated request,user not logged in"
        }
    }
    const token = (Math.random() * 1000).toString();
    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(userId),
            amount: amount * 100
        }
    });

    return {
        message: "Done"
    }
}