import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../progress/prisma";


export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

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
      data: { name: name || "Player", email, password: hashedPassword },
    });

    return NextResponse.json({ message: "Pendaftaran berhasil!", user: { name: user.name, email: user.email } }, { status: 201 });
  } catch (error) {
    console.error("Registrasi Error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
