import { CreateAdoptionAdvertisementCommand } from './create-advertisement-adoption.command';
import { CreateAdoptionAdvertisementHandler } from './create-advertisement-adoption.handler';
import { DeleteAdvertisementCommand } from './delete-advertisement.command';
import { DeleteAdvertisementHandler } from './delete-advertisement.handler';
import { CreateCaringServiceAdvertisementHandler } from './create-advertisement-caring-service.handler';
import { UpdateAdoptionAdvertisementCommand } from './update-adoption-advertisement.command';
import { UpdateAdoptionAdvertisementHandler } from './update-adoption-advertisement.handler';
import { UpdateCaringServiceAdvertisementHandler } from './update-caring-service-advertisement-advertisement.handler';
import { CreateCaringServiceAdvertisementCommand } from './create-advertisement-caring-service.command';
import { UpdateCaringServiceAdvertisementCommand } from './update-caring-service-advertisement.command';
import { ApplyForAdvertisementHandler } from './apply-for-advertisement.handler';
import { ApplyForAdvertisementCommand } from './apply-for-advertisement.command';
import { RejectInterestedUserCommand } from './reject-interested-user.command';
import { RejectInterestedUserHandler } from './reject-interested-user.handler';
import { AcceptInterestedUserHandler } from './accept-interested-user.handler';
import { AcceptInterestedUserCommand } from './accept-interested-user.command';
import { CloseAdvertisementHandler } from './close-advertisement.handler';
import { CloseAdvertisementCommand } from './close-advertisement.command';

export const CommandHandlers = [
  CreateAdoptionAdvertisementHandler,
  CreateCaringServiceAdvertisementHandler,
  UpdateAdoptionAdvertisementHandler,
  UpdateCaringServiceAdvertisementHandler,
  DeleteAdvertisementHandler,
  ApplyForAdvertisementHandler,
  RejectInterestedUserHandler,
  AcceptInterestedUserHandler,
  CloseAdvertisementHandler,
];

export const Command = [
  CreateAdoptionAdvertisementCommand,
  CreateCaringServiceAdvertisementCommand,
  UpdateAdoptionAdvertisementCommand,
  UpdateCaringServiceAdvertisementCommand,
  DeleteAdvertisementCommand,
  ApplyForAdvertisementCommand,
  RejectInterestedUserCommand,
  AcceptInterestedUserCommand,
  CloseAdvertisementCommand
];
