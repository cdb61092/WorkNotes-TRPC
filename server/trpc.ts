import { initTRPC } from '@trpc/server';
import type { Context } from './context';
import { TRPCError } from '@trpc/server';

export const t = initTRPC.context<Context>().create();
export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;

export const isAuthed = middleware(async ({ next, ctx }) => {
	if (!ctx.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({
		ctx: {
			user: ctx.user,
		},
	});
});

export const protectedProcedure = publicProcedure.use(isAuthed);
