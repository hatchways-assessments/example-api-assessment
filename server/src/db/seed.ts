import { NODE_ENV } from "../../env";
import UserModel from "./models/user";
import db from "./db";

const SEED_PW = "123456";

type LogType = "log" | "error";
function log(message: string, type: LogType = "log") {
  // Suppress logging in test code.
  if (NODE_ENV === "test") return;

  switch (type) {
    case "error":
      return console.error(message);
    default:
      return console.log(message);
  }
}

async function seed() {
  await db.sync({ force: true });
  log("db synced!");

  const user1 = await UserModel.create({
    username: "thomas",
    password: SEED_PW,
  });

  const user2 = await UserModel.create({
    username: "santiago",
    password: SEED_PW,
  });

  const user3 = await UserModel.create({
    username: "ashanti",
    password: SEED_PW,
  });

  const user4 = await UserModel.create({
    username: "julia",
    password: SEED_PW,
  });

  const user5 = await UserModel.create({
    username: "cheng",
    password: SEED_PW,
  });

  log("seeded users");
}

async function runSeed() {
  log("seeding...");
  try {
    await seed();
  } catch (err) {
    if (err instanceof Error) log(String(err), "error");
    process.exitCode = 1;
  } finally {
    log("closing db connection");
    await db.close();
    log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

export default seed;
