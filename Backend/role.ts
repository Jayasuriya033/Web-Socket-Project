import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function roleCreate() {
  try {
    const userCount = await prisma.role.count();
    if (userCount === 0) {
      const createRole = await prisma.role.createMany({
        data: [{ name: "Admin" }, { name: "customer" }],
      });
      console.log("created successfully!");
    } else {
      // console.log("Already Created!");
    }
  } catch (error) {
    console.log(error);
  }
}

