import { DATABASE_FILE } from "../../../env";
import Sequelize from "sequelize";
import User from "./user";

function initModels(sequelize: Sequelize.Sequelize): void {
  User.initWithDatabase(sequelize);
}

export function initDatabase(type: "test" | "production"): Sequelize.Sequelize {
  const db =
    type === "production"
      ? new Sequelize.Sequelize("database", "", "", {
          dialect: "sqlite",
          storage: DATABASE_FILE,
          logging: false,
        })
      : new Sequelize.Sequelize("sqlite::memory:", { logging: false });

  initModels(db);

  return db;
}
