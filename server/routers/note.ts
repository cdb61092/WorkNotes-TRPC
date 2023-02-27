import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '../index';

export const noteRouter = router({
    create: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                content: z.string(),
                tags: z.array(z.string()),
            }))
            .mutation(async ({ input, ctx }) => {
                return prisma.note.create({
                    data: {
                        title: input.title,
                        content: input.content,
                        tags: input.tags,
                        user_id: ctx.user.id,
                    }
                })
            }),
            getNotes: protectedProcedure.query(async ({ctx}) => {
                return prisma.note.findMany({
                    where: {
                        user_id: ctx.user.id,
                    }
                })
            })
            
        });
    
        

        
