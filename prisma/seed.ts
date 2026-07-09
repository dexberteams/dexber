import { db } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const adminEmail = "admin@dexber.com";
  const adminPassword = "dexberadmin"; // Change this in production!

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await db.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Dexber Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user created/verified:", admin.email);
}

main()
  .then(async () => {
    // await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    // await db.$disconnect();
    process.exit(1);
  });
