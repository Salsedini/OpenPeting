import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '..';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);