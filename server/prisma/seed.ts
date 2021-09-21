import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Alice Book1",
          content: "Alice in wonderland",
          publish: true,
        },
      ],
    },
  },
  {
    name: "John",
    email: "john@prisma.io",
    profile: {
      create: {
        bio: "JohnTitor",
      },
    },
  },
];

async function main() {
  console.log("Start seed processing ...");
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log("End seed processed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
