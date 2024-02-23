import { Event } from "@aulasoftwarelibre/nestjs-eventstore";

export class PetWasDeletedEvent extends Event{

    constructor(public readonly id: string){
        super(id, {
            _id: id
        });
    }

}