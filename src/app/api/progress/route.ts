import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../progress/prisma"; // Sekarang path import ini valid!

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // 1. Validasi input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Nama, email, dan password wajib diisi!" },
        { status: 400 }
      );
    }

    // 2. Cek apakah email sudah terdaftar di database
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email ini sudah terdaftar. Silakan gunakan email lain atau login." },
        { status: 400 }
      );
    }

    // 3. Enkripsi password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Simpan user baru ke database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Registrasi berhasil!", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error saat registrasi:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server saat mendaftar." },
      { status: 500 }
    );
  }
}