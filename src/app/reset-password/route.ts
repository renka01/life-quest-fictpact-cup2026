import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../api/progress/prisma'; // Pastikan path ini sesuai dengan letak prisma.ts Anda

export async function POST(req: Request) {
    try {
        const { token, newPassword } = await req.json();

        if (!token || !newPassword) {
            return NextResponse.json({ message: "Data tidak lengkap." }, { status: 400 });
        }

        // 1. Verifikasi Token Rahasia
        const secret = process.env.NEXTAUTH_SECRET as string;
        let decoded: any;
        try {
            decoded = jwt.verify(token, secret);
        } catch (error) {
            return NextResponse.json({ message: "Token tidak valid atau sudah kedaluwarsa." }, { status: 400 });
        }

        const email = decoded.email;

        // 2. Hash Kata Sandi Baru
        // Menggunakan salt rounds 10 (standar industri)
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 3. Update data di Database
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: "Kata sandi berhasil diubah." }, { status: 200 });
    } catch (error) {
        console.error("Error saat reset kata sandi:", error);
        return NextResponse.json({ message: "Terjadi kesalahan internal pada server." }, { status: 500 });
    }
}
