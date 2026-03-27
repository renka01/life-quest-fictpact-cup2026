import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "../../progress/prisma"; // Pastikan path prisma-mu benar

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi");
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("Email tidak ditemukan atau akun ini terdaftar melalui Google/Github.");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Kata sandi salah");
        }

        return { id: user.id.toString(), email: user.email, name: user.name };
      }
    })
  ],
  callbacks: {
    // Callback ini dipanggil setiap kali ada user yang login (baik OAuth maupun Credentials)
    async signIn({ user, account }) {
      // Kita hanya perlu memproses yang masuk via Google atau Github
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          if (!user.email) {
            return false; // Tolak login jika email tidak diberikan oleh provider
          }

          // Cek apakah user sudah ada di database
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          // Jika belum ada, buatkan akun baru di database
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || user.email.split("@")[0], 
                password: "", // Kasih string kosong biar TypeScript & Prisma tenang
              },
            });
          }

          return true; // Izinkan login
        } catch (error) {
          console.error(`Error saving ${account.provider} user to DB:`, error);
          return false; // Tolak login jika terjadi error database
        }
      }

      // Jika login pakai Credentials, langsung izinkan karena pengecekan DB sudah ada di fungsi authorize()
      return true;
    },

    // (Opsional) Mengirimkan data session agar ID user bisa dipakai di frontend kalau dibutuhkan
    async session({ session, token }) {
      if (session.user && token.sub) {
        // @ts-ignore
        session.user.id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions) as any;

export { handler as GET, handler as POST };