import { PORT } from "../env";
import app from "./app";
import "./db/db";

const port = PORT;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
