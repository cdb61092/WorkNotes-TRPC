import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../index';
import argon2 from "argon2"
import jwt from "jsonwebtoken";

export const userRouter = router({
    login: publicProcedure.input(z.object({email: z.string(), password: z.string()})).mutation(async ({input}) => {
        const user = await prisma.users.findFirst({
          where: {
            email: input.email
          }
        });
        const passwordValid = await argon2.verify(user?.password!, input.password);
      
        if (!passwordValid) {
          throw new TRPCError({ code: 'BAD_REQUEST' });
        }
        const token = jwt.sign({email: input.email}, process.env.JWT_SECRET!);
        return { token };
      }),
      register: publicProcedure.input(
        z.object({
            email: z.string(), 
            password: z.string(), 
            first_name: z.string(), 
            last_name: z.string()
        }))
            .mutation(async ({input}) => {
        return prisma.users.create({
          data: {
            email: input.email,
            password: await argon2.hash(input.password),
            first_name: input.first_name,
            last_name: input.last_name
          }
      });
    })});
