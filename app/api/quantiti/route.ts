import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const countProduct = await prisma.countProduct.findMany();

    return NextResponse.json(countProduct);
}