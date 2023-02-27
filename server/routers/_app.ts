import { mergeRouters } from '../trpc';
import { userRouter } from './user';
import { noteRouter } from './note';


export const appRouter = mergeRouters(userRouter, noteRouter);
export type AppRouter = typeof appRouter;
