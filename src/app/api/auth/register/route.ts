import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email dan kata sandi wajib diisi" }, { status: 400 });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email sudah terdaftar!" }, { status: 400 });
    }

    // Hash password agar aman
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke database
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({ message: "Pendaftaran berhasil!", user: { email: user.email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
