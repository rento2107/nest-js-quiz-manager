// jwt.decorator.ts
import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../gaurds/access-token.guard';

export function Jwt() {
  return applyDecorators(UseGuards(JwtGuard));
}
