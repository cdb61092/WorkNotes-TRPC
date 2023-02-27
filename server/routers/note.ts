import { router, publicProcedure, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../index';

export const noteRouter = router({
    create: publicProcedure
        .input(
            z.object({
                title: z.string(),
                content: z.string(),
                tags: z.array(z.string()),
            }))
            .mutation(async ({ input, ctx }) => {
                console.log('inside mutation');
                if (ctx.user) {
                    return prisma.note.create({
                        data: {
                            title: input.title,
                            content: input.content,
                            tags: input.tags,
                            user_id: ctx.user.id,
                        }
                    })
                }
                throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid token' });
            }),
            getNotes: protectedProcedure.query(async ({ctx}) => {
                return prisma.note.findMany({
                    where: {
                        user_id: ctx.user.id,
                    }
                })
            })
            
        });
    
        

        
