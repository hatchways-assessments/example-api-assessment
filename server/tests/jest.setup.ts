import * as models from "../src/db/models";

import { afterAll, beforeEach, jest } from "@jest/globals";

jest.doMock("../src/db/db", () => {
  const { initDatabase } = jest.requireActual(
    "../src/db/models"
  ) as typeof models;
  const fakeDb = initDatabase("test");
  return fakeDb;
});

beforeEach(async () => {
  const { default: seed } = await import("../src/db/seed");
  await seed();
});

afterAll(async () => {
  const { default: db } = await import("../src/db/db");
  db.close();
});
