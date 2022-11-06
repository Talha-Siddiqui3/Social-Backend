import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { UserContactsRequestDto } from './dto/user-contacts-request.dto';
import { UserContactsResponseDto } from './dto/user-contacts-response.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserConversationsResponseDto } from './dto/user-conversations-response.dto';
import { MessagesResponseDto } from './dto/messages-response.dto';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @MessagePattern('getUserContacts')
  getUserByPhoneNumber(
    @Payload() userContactsRequestDto: UserContactsRequestDto,
  ): Promise<UserContactsResponseDto> {
    return this.conversationService.getUserContacts(userContactsRequestDto);
  }

  @MessagePattern('getUserConversations')
  getUserConversations(
    @Payload() userID: string,
  ): Promise<UserConversationsResponseDto> {
    return this.conversationService.getUserConversations(userID);
  }

  @MessagePattern('getConversationMessages')
  getConversationMessages(
    @Payload() conversationID: string,
  ): Promise<MessagesResponseDto> {
    return this.conversationService.getConversationMessages(conversationID);
  }
}
