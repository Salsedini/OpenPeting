import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteUserCommand } from "./delete-user.command";
import { InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";
import { User } from "../../domain/model";
import { UserRepository } from '../../domain/service/repository.service';
import { UserId } from "../../domain/model/value_object";
import { Result, err, ok } from "neverthrow";
import { UserNotFoundError } from "../../domain/exception";


@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand>{

    constructor(
        @InjectAggregateRepository(User)
        private readonly userRepository: UserRepository<User, UserId>,
        ) { }

    async execute(command: DeleteUserCommand): Promise<Result<null, UserNotFoundError>> {

        const id = UserId.fromString(command.id);

        const foundUser = await this.userRepository.find(id);

        if (!foundUser){
            return err(UserNotFoundError.withId(id));
        }

        foundUser.delete();

        this.userRepository.save(foundUser);

        return ok(null);

    }

}