import { Injectable } from '@nestjs/common';
import { UserContactsRequestDto } from './dto/user-contacts-request.dto';
import { UserContactsResponseDto } from './dto/user-contacts-response.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Connection } from 'mysql2/promise';
import { getUserConversationsQuery } from './sql.queries/queries';
import { UserConversationDbModel } from './models/user-conversation-db.model';
import { UserConversationModel } from './models/user-conversation.model';
import { UserConversationsResponseDto } from './dto/user-conversations-response.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectDataSource() private readonly connection: Connection,
  ) {}

  async getUserContacts(
    userContactsRequestDto: UserContactsRequestDto,
  ): Promise<UserContactsResponseDto> {
    const users = await this.usersRepository.find({
      where: { phoneNumber: In(userContactsRequestDto.userContacts) },
      order: { firstName: 'ASC' },
    });
    const userContacts = users.map((user) => {
      return {
        contactFirstName: user.firstName,
        contactLastName: user.lastName,
        contactUserID: user.id,
        contactNumber: user.phoneNumber,
        contactUserImage: user.profilePicture,
      };
    });
    return {
      success: true,
      userContacts: userContacts,
    };
  }

  async getUserConversations(
    userID: string,
  ): Promise<UserConversationsResponseDto> {
    // @ts-ignore
    const userConversations: UserConversationDbModel[] =
      await this.connection.query<UserConversationDbModel[]>(
        getUserConversationsQuery,
        [userID, userID],
      );

    const userConversationIDToUserConversationMap =
      this.listToMap<UserConversationDbModel>(
        'conversationID',
        userConversations,
      );

    const userConversationsModels = Object.values(userConversationIDToUserConversationMap).map(
      (userConversationDbModels) => {
        return new UserConversationModel(userConversationDbModels)
      },
    );

    return { success: true, conversations: userConversationsModels };
  }

  listToMap<T>(key: string, list: T[]): { string: T[] } | {} {
    const map: { [key: string]: T[] } = {};

    list.forEach((item: T) => {
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(item);
    });

    return map;
  }
}
