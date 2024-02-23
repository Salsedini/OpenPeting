import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "./update-user.command";
import { InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";
import { User } from "../../domain/model";
import { UserRepository } from "../../domain/service";
import { UserId } from "../../domain/model/value_object/user-id";
import { UserMail, UserName, UserPhone, UserPicture, UserSurname } from "../../domain/model/value_object";
import { Result, err, ok } from "neverthrow";
import { UserNotFoundError } from "../../domain/exception";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand>{
    
    constructor(
        @InjectAggregateRepository(User)
         private readonly userRepository: UserRepository<User, UserId>,
    ) {}
    
    async execute(command: UpdateUserCommand): Promise<Result<null, UserNotFoundError>> {

        const id = UserId.fromString(command.id);
        const foundUser = await this.userRepository.find(id);

        if (!foundUser){
            return err(UserNotFoundError.withId(id));
        }

        const name = UserName.fromString(command.name);
        foundUser.updateName(name);

        const surname = UserSurname.fromString(command.surname);
        foundUser.updateSurname(surname);

        const phone = UserPhone.fromNumber(command.phone);
        foundUser.updatePhone(phone);

        const mail = UserMail.fromString(command.mail);
        foundUser.updateMail(mail);

        const picture = UserPicture.fromString(command.picture);
        foundUser.updatePicture(picture);

        this.userRepository.save(foundUser);

        return ok(null);
        
    }

}