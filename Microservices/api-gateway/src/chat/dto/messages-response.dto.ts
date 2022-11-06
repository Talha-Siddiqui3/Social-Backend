
import { MessageModel } from '../models/message.model';
import {BaseResponseDto} from "../../dto/base.response.dto";

export class MessagesResponseDto extends BaseResponseDto {
  messages: MessageModel[];
}
