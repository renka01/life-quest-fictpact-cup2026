import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/app/api/progress/prisma';

export async function DELETE(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email diperlukan" }, { status: 400 });
    }

    const deleteResult = await prisma.user.deleteMany({
      where: { email: email },
    });

    if (deleteResult.count === 0) {
      return NextResponse.json({ error: "Gagal hapus: Akun tidak ditemukan di database!" }, { status: 404 });
    }

    return NextResponse.json({ message: "Akun berhasil dihapus permanen" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json({ error: "Gagal menghapus akun" }, { status: 500 });
  }
}