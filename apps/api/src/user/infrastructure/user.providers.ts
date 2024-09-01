import { USER_FINDER } from '../application/service/user-finder.service';
import { USER_SECURITY } from '../application/service/user-security.interface';
import { MongoDBUserFinder } from './service/user-finder.service';
import { UserSecurity } from './service/user-security.service';

export const UserProviders = [
    {
        provide: USER_FINDER,
        useClass: MongoDBUserFinder,
    },
    {
        provide: USER_SECURITY,
        useClass: UserSecurity,
    }
];
