import {Body, Controller, Get, Inject, Post, Query, UseGuards} from '@nestjs/common';
import { UserContactsRequestDto } from './dto/user-contacts-request.dto';
import { UserContactsResponseDto } from './dto/user-contacts-response.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserConversationsResponseDto } from './dto/user-conversations-response.dto';
import { MessagesResponseDto } from './dto/messages-response.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('conversations')
export class ChatController {
  constructor(@Inject('CHAT_SERVICE') private client: ClientProxy) {}

  @UseGuards(JwtAuthGuard)
  @Post('userContacts')
  getUserContacts(
    @Body() userContactsRequestDto: UserContactsRequestDto,
  ): Observable<UserContactsResponseDto> {
    console.log('userContactsRequestDto', userContactsRequestDto);
    return this.client.send('getUserContacts', userContactsRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserConversations(
    @Query('userID') userID: string,
  ): Observable<UserConversationsResponseDto> {
    return this.client.send('getUserConversations', userID);
  }

  @UseGuards(JwtAuthGuard)
  @Get('messages')
  getConversationMessages(
    @Query('conversationID') conversationID: string,
  ): Observable<MessagesResponseDto> {
    return this.client.send('getConversationMessages', conversationID);
  }
}
