import {Body, Controller, Get, Post} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { UserContactsRequestDto } from './dto/user-contacts-request.dto';
import {UserContactsResponseDto} from "./dto/user-contacts-response.dto";

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('userContacts')
  getUserContacts(@Body() userContactsRequestDto: UserContactsRequestDto): Promise<UserContactsResponseDto> {
    console.log('userContactsRequestDto', userContactsRequestDto)
    return this.conversationService.getUserContacts(userContactsRequestDto);
  }
}
