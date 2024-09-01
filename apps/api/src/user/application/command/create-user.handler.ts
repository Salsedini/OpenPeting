import { err, ok, Result } from 'neverthrow';
import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from './create-user.command';
import { match, P } from 'ts-pattern';

import { User } from '../../domain/model';
import {
    UserId,
    UserMail,
    UserName,
    UserPassword,
    UserSurname,
} from '../../domain/model/value_object';

import { UserRepository } from '../../domain/service';
import { UserAlreadyExistsError } from '../../domain/exception';
import { Inject } from '@nestjs/common';
import { UserSecurity } from '../../infrastructure/service/user-security.service';
import { IUserSecurity, USER_SECURITY } from '../service/user-security.interface';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

    constructor(
        @InjectAggregateRepository(User)
        private readonly userRepository: UserRepository<User, UserId>,
        @Inject(USER_SECURITY)
        private readonly userSecurity: IUserSecurity
    ) { }

    async execute(command: CreateUserCommand): Promise<Result<null, UserAlreadyExistsError>> {

        const id = UserId.generate();
        const foundUser = await this.userRepository.find(id);

        return match(foundUser)
            .with(P.instanceOf(User), (foundUser: User) => {

                return err(UserAlreadyExistsError.withId(id));
            })
            .otherwise(async () => {


        // const encodedPassword = await this.userSecurity.encodePassword(
        //     command.password
        //   );
        // console.log("🚀 ~ CreateUserHandler ~ .otherwise ~ encodedPassword:", encodedPassword)

                const name = UserName.fromString(command.name);
                const password = UserPassword.fromString(command.password);
                const surname = UserSurname.fromString(command.surname);
                const email = UserMail.fromString(command.email);
                const role = command.role;
                const user = User.add(id, name, password, email, surname, role);
                
                this.userRepository.save(user);

                return ok(null);
            });
    }
}


