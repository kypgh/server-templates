import express from "express";
import cors from "cors";
import { PORT } from "config/env";
import folderRouter from "utils/folderRouter";
import path from "path";
import defaultErrorHandler from "utils/defaultErrorHandler";
import { loggerConsole } from "config/logger";

async function main() {
  const server = express();

  server.use(loggerConsole);
  server.use(cors());
  server.use(express.json());


  await folderRouter(server, path.resolve(__dirname, "./routes"));

  server.use("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
  });

  server.use(defaultErrorHandler);

  server.listen(PORT, () => {
    console.info(`Server running on port http://localhost:${PORT}`);
  });
}

main();