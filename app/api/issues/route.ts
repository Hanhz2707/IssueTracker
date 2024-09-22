import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/AuthOption";





// Creating a Post method
export const POST = async (request: NextRequest) => {

    const session = await getServerSession(authOption);

    if(!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    // If not valid, return an error
    if(!validation.success) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const newIssue = await prisma.issue.create({
        data: {title: body.title, description: body.description}
    })

    return NextResponse.json(newIssue, { status: 201 });




}
