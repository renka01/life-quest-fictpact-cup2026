import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` akan memperkaya `req` dengan `token` jika pengguna sudah login
  function middleware(req) {
    console.log("MIDDLEWARE DIPANGGIL UNTUK PATH:", req.nextUrl.pathname);
    console.log("TOKEN PENGGUNA:", req.nextauth.token);

    // Jika Anda butuh logika tambahan berdasarkan role, bisa ditambahkan di sini
    // Contoh: if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
    //   return NextResponse.rewrite(new URL("/denied", req.url));
    // }
  },
  {
    callbacks: {
      // Callback ini menentukan apakah pengguna diizinkan mengakses halaman.
      // Jika token ada (sudah login), maka `authorized` akan `true`.
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  // Matcher menentukan rute mana saja yang akan dicek oleh middleware.
  // Kita menambahkan regex `.*\\.(?:png|jpg|jpeg|svg|gif|webp|mp3|wav|ogg)$`
  // agar semua file aset media di folder public tidak ikut diblokir.
  matcher: ["/((?!api|login|register|faq|start|_next/static|_next/image|favicon.ico|forgot-password|reset-password|.*\\.(?:png|jpg|jpeg|svg|gif|webp|mp3|wav|ogg)$).*)"],
};