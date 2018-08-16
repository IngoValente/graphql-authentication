import { generateToken, getUserId, Context } from './utils';
// Without this manual User interface import, TypeScript will create an incorrect queries.d.ts declaration file, WTF?
import { User } from './Adapter';

export const queries = {
  async currentUser(parent: any, args: any, ctx: Context, info: any) {
    const id = getUserId(ctx);
    const user = await ctx.graphqlAuthentication.adapter.findUserById(ctx, id);
    return {
      token: user ? generateToken(user, ctx) : null,
      user
    };
  }
};
