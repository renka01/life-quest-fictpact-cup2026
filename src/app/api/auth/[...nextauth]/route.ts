import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "../../progress/prisma";


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan kata sandi wajib diisi");
        }

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) throw new Error("Email tidak terdaftar");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Kata sandi salah");

        return { id: user.id, email: user.email, name: user.name };
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "rahasia_negara_123",
  pages: {
    signIn: "/login",
  }
});

export { handler as GET, handler as POST };
