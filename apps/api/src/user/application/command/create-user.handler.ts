import { Err, Ok, err, ok, Result } from 'neverthrow';
import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from './create-user.command';
import { match, P } from 'ts-pattern';

import { User } from '../../domain/model';
import {
    UserId,
    UserName,
} from '../../domain/model/value_object';

import { UserRepository } from '../../domain/service';
import { UserAlreadyExistsError } from '../../domain/exception';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

    constructor(
        @InjectAggregateRepository(User)
        private readonly userRepository: UserRepository<User, UserId>,
    ) { }


    async execute(command: CreateUserCommand): Promise<Result<null, UserAlreadyExistsError>> {

        const id = UserId.generate();

        const foundUser = await this.userRepository.find(id)

        return match(foundUser)
            .with(P.instanceOf(User), (foundUser: User) => {

                return err(UserAlreadyExistsError.withId(id));
            })
            .otherwise(() => {

                const name = UserName.fromString(command.name);
                const user = User.add(id, name);
                this.userRepository.save(user);

                return ok(null);
            });
    }
}


