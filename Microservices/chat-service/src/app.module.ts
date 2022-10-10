import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversationService } from './conversation/conversation.service';
import { ConversationController } from './conversation/conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { User } from './entities/user.entity';
import { UserConversation } from './entities/user-conversation.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: 'main',
      entities: [User, Conversation, UserConversation],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Conversation]),
  ],
  controllers: [AppController, ConversationController],
  providers: [AppService, ConversationService],
})
export class AppModule {}
