import { UserDTO } from 'contracts/src/lib/User-dtos';
import { UserId, UserMail, UserName } from '../../domain/model/value_object';

export const USER_FINDER = 'USER_FINDER';

export interface UserFinder {
  findAll(): Promise<Array<UserDTO>>;
  findByName(name: UserName): Promise<Array<UserDTO>>;
  findById(id: UserId): Promise <UserDTO>;
  findByEmail(email: UserMail): Promise <UserDTO>;
}
