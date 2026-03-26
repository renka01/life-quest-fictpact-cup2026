import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

// Fungsi LOAD: Mengambil progress user dari database
export async function GET(req: Request) {
  // Cek siapa yang sedang login
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    return NextResponse.json({ gameState: user?.gameState });
  } catch (error) {
    return NextResponse.json({ error: "Gagal memuat progress" }, { status: 500 });
  }
}

// Fungsi SAVE: Menyimpan progress Zustand ke database
export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { gameState } = await req.json();
    await prisma.user.update({
      where: { email: session.user.email },
      data: { gameState },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menyimpan progress" }, { status: 500 });
  }
}
