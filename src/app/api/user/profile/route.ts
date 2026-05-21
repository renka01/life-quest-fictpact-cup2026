import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

/**
 * ═══════════════════════════════════════════════════════════
 * [GET] API UNTUK MENGAMBIL PROFIL & GAME STATE USER
 * ═══════════════════════════════════════════════════════════
 * Digunakan saat user berhasil masuk ke aplikasi untuk mengisi
 * state di useStore() berdasarkan data cloud terbaru.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mengambil data user berdasarkan email yang aktif di session
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

    // Mengembalikan data gabungan akun dan game state
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
    // Memastikan koneksi database ditutup dengan aman setelah operasi selesai
    await prisma.$disconnect();
  }
}

/**
 * ═══════════════════════════════════════════════════════════
 * [POST] API UNTUK PEMBUATAN KARAKTER BARU (CHARACTER SELECTION)
 * ═══════════════════════════════════════════════════════════
 * Dilengkapi pengaman validasi simbol dan proteksi duplikasi nama 
 * lintas objek JSONB global untuk keperluan fitur alternatif login.
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Validasi gerbang otorisasi session token
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { nickname, gender, avatarId } = body;

    // Validasi input kosong
    if (!nickname || nickname.trim() === "") {
      return NextResponse.json({ error: "Nama karakter wajib diisi!" }, { status: 400 });
    }

    const targetNickname = nickname.trim();

    // 🛡️ PROTEKSI 1: Melarang penggunaan simbol '@' agar sistem auth tidak rancu dengan format email
    if (targetNickname.includes("@")) {
      return NextResponse.json({ 
        error: "Nama karakter dilarang mengandung simbol '@'!" 
      }, { status: 400 });
    }

    // 🛡️ PROTEKSI 2: Pengecekan keunikan nama karakter di dalam skema objek JSONB 'gameState'
    // Menggunakan operator PostgreSQL (->>) lewat query mentah agar pencarian presisi dan cepat
    const existingNicknameUser = await prisma.$queryRaw<any[]>`
      SELECT id FROM "User" 
      WHERE "gameState"->>'nickname' = ${targetNickname}
      LIMIT 1
    `;

    if (existingNicknameUser && existingNicknameUser.length > 0) {
      return NextResponse.json({ 
        error: "Nama karakter ini sudah diambil oleh petarung lain! Cari nama lain." 
      }, { status: 400 });
    }

    // Menyiapkan struktur game state awal (Level 1, Modal 100 Gold)
    const newGameState = {
      nickname: targetNickname,
      gender: gender,
      avatarId: avatarId || 1,
      level: 1,
      gold: 100, 
      exp: 0,
      createdAt: new Date().toISOString()
    };

    // ⚡ EKSEKUSI DATA: Simpan gameState dan duplikat nama ke kolom 'name' untuk indeks login cepat
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        gameState: newGameState,
        name: targetNickname // Sinkronisasi ke kolom name agar NextAuth langsung mengenali nickname ini
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
    // Memastikan koneksi database ditutup dengan aman setelah operasi selesai
    await prisma.$disconnect();
  }
}