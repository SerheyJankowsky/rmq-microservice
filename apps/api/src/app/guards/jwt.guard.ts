import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

class JwtGuard extends AuthGuard('jwt') {}

export const AUTH_GUARD = UseGuards(JwtGuard);
