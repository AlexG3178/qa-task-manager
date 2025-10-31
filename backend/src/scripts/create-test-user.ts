import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'alex@example.com',
      password: 'test1234' // хешировать не нужно для теста
    }
  });
  console.log('✅ Created user:', user);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
