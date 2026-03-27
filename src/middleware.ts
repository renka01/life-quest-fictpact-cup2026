import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Akan mengarahkan user ke halaman ini jika belum login
  },
});

export const config = {
  // Matcher menentukan rute mana saja yang akan dicek oleh middleware.
  // Konfigurasi di bawah ini akan melindungi SEMUA rute,
  // KECUALI rute /login, /register, folder /api, dan aset statis (_next, favicon, dll).
  matcher: ["/((?!login|register|api|_next/static|_next/image|favicon.ico).*)"],
};