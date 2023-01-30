import express from "express";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';

const createContext = ({
  req, res
}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  hello: t.procedure.query(() => {
    return {
      greeting: 'Hello World!'
    }
  })
});

export type AppRouter = typeof appRouter;


const app = express();
const port = 8080;

app.use('/trpc', trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext
})
);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
