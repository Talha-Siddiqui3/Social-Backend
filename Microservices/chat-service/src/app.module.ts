import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversationService } from './conversation/conversation.service';
import { ConversationController } from './conversation/conversation.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Conversation} from "../entities/conversation.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-service-internal.default.svc.cluster.local',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: 'main',
      entities: [User, Conversation],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Conversation])
  ],
  controllers: [AppController, ConversationController],
  providers: [AppService, ConversationService],
})
export class AppModule {}
