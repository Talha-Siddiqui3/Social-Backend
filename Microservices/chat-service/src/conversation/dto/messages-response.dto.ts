import { BaseResponseDto } from '../../dto/base-response.dto';
import { MessageModel } from '../models/message.model';

export class MessagesResponseDto extends BaseResponseDto {
  messages: MessageModel[];
}
