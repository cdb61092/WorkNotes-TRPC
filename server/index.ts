import express from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from "./context";
import { PrismaClient } from '@prisma/client'
import cors from "cors";
import * as dotenv from "dotenv";
import { appRouter } from "./routers/_app";

dotenv.config();

export const prisma = new PrismaClient();

const app = express();
app.use(cors());

app.use('/trpc', trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext
})
);

const port = 8080;
app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
