import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthService } from 'apps/api/src/auth/src';
import { IUserSecurity } from '../../application/service/user-security.interface';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries


@Injectable()
export class UserSecurity implements IUserSecurity, OnModuleInit {
  private authService: AuthService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.authService = this.moduleRef.get(AuthService, { strict: false });
  }

  async encodePassword(password: string): Promise<string> {
    return await this.authService.encodePassword(password);
  }
}
