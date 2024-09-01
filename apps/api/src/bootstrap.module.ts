
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
    EVENTSTORE_KEYSTORE_CONNECTION,
    EventStoreModule,
} from '@aulasoftwarelibre/nestjs-eventstore';
import configuration from './config/configuration';
import { UserModule } from './user';
import { PetModule } from './pet';
import { AdvertisementModule } from './advertisement';
import { AuthModule } from './auth/src/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    PetModule,
    AuthModule,
    AdvertisementModule,
    CqrsModule,
    EventStoreModule.forRoot({
      connection: process.env.EVENTSTORE_URI || '',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || '', {}),
    MongooseModule.forRoot(process.env.KEYSTORE_URI || '', {
      connectionName: EVENTSTORE_KEYSTORE_CONNECTION,
    }),
  ],
})
export class BootstrapModule {}
