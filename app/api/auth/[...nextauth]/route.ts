import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client"
import authOption from "@/app/auth/AuthOption"

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }  