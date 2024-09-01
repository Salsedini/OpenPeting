import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import {
  CreateAdoptionAdvertisementDTO,
  GetAllAdvertisementsDTO,
  AdvertisementDTO,
  UpdateAdvertisementDTO,
  CreateCaringServiceAdvertisementDTO,
  AcceptAdvertisementAplicationDTO,
  CloseAdvertisementDTO,
} from 'contracts/src/lib/Advertisement-dtos';
import { Result } from 'neverthrow';

import { CreateAdoptionAdvertisementCommand } from '../../application/command/create-advertisement-adoption.command';
import { AdvertisementError } from '../../domain/exception';
import { GetAdvertisementsQuery } from '../../application/query/get-advertisements.query';
import { UpdateAdoptionAdvertisementCommand } from '../../application/command/update-adoption-advertisement.command';
import { DeleteAdvertisementCommand } from '../../application/command/delete-advertisement.command';
import { CreateCaringServiceAdvertisementCommand } from '../../application/command/create-advertisement-caring-service.command';
import { UpdateCaringServiceAdvertisementCommand } from '../../application/command/update-caring-service-advertisement.command';
import { ApplyForAdvertisementDTO } from '../../../../../../contracts/src/lib/Advertisement-dtos/apply-for-advertisement.dto';
import { ApplyForAdvertisementCommand } from '../../application/command/apply-for-advertisement.command';
import { RejectInterestedUserCommand } from '../../application/command/reject-interested-user.command';
import { AcceptInterestedUserCommand } from '../../application/command/accept-interested-user.command';
import { CloseAdvertisementCommand } from '../../application/command/close-advertisement.command';

@Injectable()
export class AdvertisementService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createAdoptionAdvertisement(
    createAdvertisementDTO: CreateAdoptionAdvertisementDTO
  ): Promise<Result<null, AdvertisementError>> {
    return await this.commandBus.execute<
      ICommand,
      Result<null, AdvertisementError>
    >(
      new CreateAdoptionAdvertisementCommand(
        createAdvertisementDTO.ownerId,
        createAdvertisementDTO.petId,
        createAdvertisementDTO.city
      )
    );
  }

  async createCaringServiceAdvertisement(
    createAdvertisementDTO: CreateCaringServiceAdvertisementDTO
  ): Promise<Result<null, AdvertisementError>> {

    console.log('createAdvertisementDTO dates', createAdvertisementDTO.start, createAdvertisementDTO.end);
    return await this.commandBus.execute<
      ICommand,
      Result<null, AdvertisementError>
    >(
      new CreateCaringServiceAdvertisementCommand(
        createAdvertisementDTO.ownerId,
        createAdvertisementDTO.petId,
        createAdvertisementDTO.city,
        createAdvertisementDTO.price,
        createAdvertisementDTO.start,
        createAdvertisementDTO.end
      )
    );
  }

  async updateAdoptionAdvertisement(params: {
    id: string;
    fieldsToUpdate: UpdateAdvertisementDTO;
  }): Promise<Result<null, AdvertisementError>> {
    return await this.commandBus.execute<
      ICommand,
      Result<null, AdvertisementError>
    >(new UpdateAdoptionAdvertisementCommand(params.id, params.fieldsToUpdate.city));
  }

  async applyForAdvertisement(params: {
    id:string;
    fieldsToUpdate: ApplyForAdvertisementDTO;
  }): Promise <Result<null, AdvertisementError>> {

    return await this.commandBus.execute<
    ICommand,
    Result<null,AdvertisementError>
    >(new ApplyForAdvertisementCommand(params.id, params.fieldsToUpdate.interestedUserId))
  }

  async rejectInterestedUser(params: {
    id:string;
    fieldsToUpdate: ApplyForAdvertisementDTO;
  }): Promise <Result<null, AdvertisementError>> {

    return await this.commandBus.execute<
    ICommand,
    Result<null,AdvertisementError>
    >(new RejectInterestedUserCommand(params.id, params.fieldsToUpdate.interestedUserId))
  }

  async acceptAdvertisementAplication(params: {
    id:string;
    fieldsToUpdate: AcceptAdvertisementAplicationDTO;
  }): Promise <Result<null, AdvertisementError>> {

    return await this.commandBus.execute<
    ICommand,
    Result<null,AdvertisementError>
    >(new AcceptInterestedUserCommand(params.id, params.fieldsToUpdate.acceptedUserId))
  }

  async updateCaringServiceAdvertisement(params: {
    id: string;
    fieldsToUpdate: UpdateAdvertisementDTO;
  }): Promise<Result<null, AdvertisementError>> {
    return await this.commandBus.execute<
      ICommand,
      Result<null, AdvertisementError>
    >(new UpdateCaringServiceAdvertisementCommand(
        params.id,
        params.fieldsToUpdate.city,
        params.fieldsToUpdate.price,
        new Date(params.fieldsToUpdate.start),
        new Date(params.fieldsToUpdate.end)
      )
    );
  }

  async getAdvertisements(
    _: GetAllAdvertisementsDTO
  ): Promise<Array<AdvertisementDTO>> {
    return await this.queryBus.execute<IQuery, Array<AdvertisementDTO> | null>(
      new GetAdvertisementsQuery()
    );
  }

  async deleteAdvertisement(
    id: string
  ): Promise<Result<null, AdvertisementError>> {
    return await this.commandBus.execute<
      ICommand,
      Result<null, AdvertisementError>
    >(new DeleteAdvertisementCommand(id));
  }

  async closeAdvertisement(params: {
    id:string;
    fieldsToUpdate: CloseAdvertisementDTO;
  }): Promise <Result<null, AdvertisementError>> {

    return await this.commandBus.execute<
    ICommand,
    Result<null,AdvertisementError>
    >(new CloseAdvertisementCommand(params.id, params.fieldsToUpdate.petId, params.fieldsToUpdate.newOwnerId))
  }

}
