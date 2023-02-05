import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { DecodedToken } from './types';
import { prisma } from './index';
import jwt from "jsonwebtoken";

export const createContext = async ({
    req, res
  }: trpcExpress.CreateExpressContextOptions) => {
  
    async function getUserFromHeader() {
      if (req.headers.authorization) {
        const token = req.headers.authorization;
        let decodedToken: DecodedToken | undefined;
        try {
           decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        } catch (error) {
          console.error(error);
        }
  
        const user = await prisma.users.findFirst({
          where: {
            email: decodedToken?.email
          }
        });
        return user;
      }
      return null;
    }
    const user = await getUserFromHeader();
  
    return { user };
  }
  export type Context = inferAsyncReturnType<typeof createContext>;