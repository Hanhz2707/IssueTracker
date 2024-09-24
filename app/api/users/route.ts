import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {

    

    const user = await prisma.user.findMany({
        orderBy: {name: 'asc'},
    });
    return NextResponse.json(user);
}