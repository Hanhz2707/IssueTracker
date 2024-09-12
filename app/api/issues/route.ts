import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
const CreateIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),

});



// Creating a Post method
export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const validation = CreateIssueSchema.safeParse(body);

    // If not valid, return an error
    if(!validation.success) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const newIssue = await prisma.issue.create({
        data: {title: body.title, description: body.description}
    })

    return NextResponse.json(newIssue, { status: 201 });




}
