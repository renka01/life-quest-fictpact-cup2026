import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import prisma from '../../progress/prisma';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        // 1. Cek apakah email ada di database
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Kembalikan error jika email tidak ditemukan, sesuai permintaan.
            return NextResponse.json(
                { message: "Email tidak terdaftar di sistem kami." },
                { status: 404 }
            );
        }

        // 2. Buat Token Rahasia (Berlaku 1 jam)
        const secret = process.env.NEXTAUTH_SECRET as string;
        const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });

        // 3. Buat Tautan (Link) Reset
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        const resetLink = `${baseUrl}/reset-password?token=${token}`;

        // 4. Konfigurasi Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // 5. Kirim Email
        await transporter.sendMail({
            from: `"Daily Dungeon Support" <${process.env.GMAIL_EMAIL}>`,
            to: email,
            subject: 'Reset Kata Sandi - Daily Dungeon',
            html: `
                <h2>Permintaan Reset Kata Sandi</h2>
                <p>Seseorang telah meminta untuk mereset kata sandi akun Daily Dungeon kamu.</p>
                <p>Klik tautan di bawah ini untuk membuat kata sandi baru:</p>
                <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background:#f59e0b;color:#18181b;text-decoration:none;border-radius:5px;font-weight:bold;">Reset Kata Sandi</a>
                <p><br>Tautan ini hanya berlaku selama 1 jam. Jika kamu tidak memintanya, abaikan saja email ini.</p>
            `,
        });

        return NextResponse.json({ message: 'Jika email terdaftar, tautan reset telah dikirim.' });
    } catch (error) {
        console.error('Error forgot password:', error);
        return NextResponse.json(
            { message: 'Gagal mengirim email.' },
            { status: 500 }
        );
    }
}