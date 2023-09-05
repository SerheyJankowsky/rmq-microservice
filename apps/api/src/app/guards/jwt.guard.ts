import { AuthGuard } from '@nestjs/passport';
import { Injectable, UseGuards } from '@nestjs/common';
@Injectable()
class JwtGuard extends AuthGuard('jwt') {}

export const AUTH_GUARD = () => UseGuards(JwtGuard);
