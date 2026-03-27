import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { gameState: true }
    });

    return NextResponse.json({ gameState: user?.gameState || null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal memuat" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { gameState } = await req.json();

    // 🔥 KUNCI PERBAIKANNYA DI SINI: MENGGUNAKAN UPSERT 🔥
    await prisma.user.upsert({
      where: { email: session.user.email },
      update: { gameState: gameState },
      create: {
        email: session.user.email,
        name: session.user.name || "Adventurer",
        gameState: gameState
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error Save Progress:", error);
    return NextResponse.json({ error: "Gagal sinkronisasi cloud" }, { status: 500 });
  }
}