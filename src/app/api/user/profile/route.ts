import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        email: true,
        name: true,
        gameState: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const state = (user.gameState as any) || {};

    return NextResponse.json({
      accountName: user.email,
      nickname: state.nickname || user.name || "Hero",
      gender: state.gender || null, 
      avatarId: state.avatarId || 1,
      level: state.level || 1,
      gold: state.gold || 0,
      exp: state.exp || 0,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { nickname, gender, avatarId } = body;

    const newGameState = {
      nickname: nickname || "New Hero",
      gender: gender,
      avatarId: avatarId || 1,
      level: 1,
      gold: 100, 
      exp: 0,
      createdAt: new Date().toISOString()
    };

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        gameState: newGameState,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Character created!",
      data: newGameState 
    });

  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Gagal menyimpan karakter" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}