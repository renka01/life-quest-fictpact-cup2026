import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

declare global {
  // Mencegah beberapa instance Prisma Client di mode development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  // Di lingkungan serverless seperti Vercel, Anda memerlukan connection pool.
  // Paket 'pg' menyediakannya, dan adapter menghubungkan Prisma ke pool ini.
  // Info lebih lanjut: https://www.prisma.io/docs/guides/database/connection-management/serverless-with-connection-pool
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Variabel lingkungan DATABASE_URL tidak diatur. Silakan periksa file .env Anda.");
  }
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({ adapter });
};

// Gunakan instance yang ada jika tersedia, jika tidak, buat yang baru
const prisma = globalThis.prisma ?? prismaClientSingleton();

// Simpan instance di global object untuk development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
