import { sign } from "jsonwebtoken";

function makeToken(id: number) {
  return sign({ id }, process.env.SESSION_SECRET!, { expiresIn: 86400 });
}

export { makeToken };
