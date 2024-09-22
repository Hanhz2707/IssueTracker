import authOption from "@/app/auth/AuthOption";
import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { request } from "http";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export const PATCH = async (
    request: NextRequest,
    {params}: {params: {id: string}}) => {

    const session = await getServerSession(authOption);

    if(!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


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

export const DELETE = async (
    request: NextRequest,
    {params}: {params: {id: string}}) => {

        const session = await getServerSession(authOption);

        if(!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const issue = await prisma.issue.findUnique({
            where: {id: parseInt(params.id)}
        })

        if(!issue) {
            return NextResponse.json({status: 404, message: "Issue not found"})
        }

        await prisma.issue.delete({
            where: {id: issue.id}
        })

        return NextResponse.json({status: 200, message: "Issue deleted successfully"})

};
