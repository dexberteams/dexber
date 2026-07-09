import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ inquiries }, { status: 200 });
  } catch (error) {
    console.error("Admin Inquiries Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
