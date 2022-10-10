import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { UserContactsRequestDto } from './dto/user-contacts-request.dto';
import { UserContactsResponseDto } from './dto/user-contacts-response.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {UserConversationsResponseDto} from "./dto/user-conversations-response.dto";

@Controller('conversations')
export class ChatController {
  constructor(@Inject('CHAT_SERVICE') private client: ClientProxy) {}

  @Post('userContacts')
  getUserContacts(
    @Body() userContactsRequestDto: UserContactsRequestDto,
  ): Observable<UserContactsResponseDto> {
    console.log('userContactsRequestDto', userContactsRequestDto);
    return this.client.send('getUserContacts', userContactsRequestDto);
  }

  @Get()
  getUserConversations(@Query('userID') userID: string):Observable<UserConversationsResponseDto> {
    return this.client.send('getUserConversations', userID);
  }
}
