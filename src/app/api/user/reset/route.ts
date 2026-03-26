import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/app/api/progress/prisma';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email diperlukan" }, { status: 400 });
    }

    // Menggunakan updateMany agar tidak crash jika email belum ada di database
    const updateResult = await prisma.user.updateMany({
      where: { email: email },
      data: {
        gameState: Prisma.DbNull, 
      },
    });

    // Cek apakah ada akun yang berhasil direset
    if (updateResult.count === 0) {
      return NextResponse.json({ error: "Gagal reset: Akun belum terdaftar di database utama!" }, { status: 404 });
    }

    return NextResponse.json({ message: "Akun berhasil direset" }, { status: 200 });
  } catch (error) {
    console.error("Error resetting account:", error);
    return NextResponse.json({ error: "Gagal mereset akun karena sistem database" }, { status: 500 });
  }
}