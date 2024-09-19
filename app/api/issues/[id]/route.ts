import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export const PATCH = async (
    request: NextRequest,
    {params}: {params: {id: string}}) => {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    
    if(!validation.success) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!issue) {
        return NextResponse.json({status: 404, message: "Issue not found"})
    }

    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {title: body.title, description: body.description}
    })

    return NextResponse.json(updatedIssue, { status: 200 });

}