import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extracts the authenticated user (or a specific property of it) from the request.
 *
 * Usage:
 *   @GetUser() user: any          — full user object
 *   @GetUser('_id') userId: string — specific property
 *   @GetUser('sub') userId: string — JWT subject (falls back to `_id`)
 */
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!data) return user;
    // JWT payload uses `sub`; request.user is the hydrated User document with `_id`.
    if (data === 'sub') return user?.sub ?? user?._id;
    return user?.[data];
  },
);
