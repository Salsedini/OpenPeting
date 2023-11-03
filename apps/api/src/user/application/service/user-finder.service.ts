import { UserDTO } from '@hdd-skeleton/contracts';
import { UserName } from '../../domain/model/value_object';

export const USER_FINDER = 'USER_FINDER';

export interface UserFinder {
  findAll(): Promise<Array<UserDTO>>;
  findByName(name: UserName): Promise<Array<UserDTO>>;
}
