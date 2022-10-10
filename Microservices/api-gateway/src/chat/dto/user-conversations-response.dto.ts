
import { UserConversationModel } from '../models/user-conversation.model';
import {BaseResponseDto} from "../../dto/base.response.dto";

export class UserConversationsResponseDto extends BaseResponseDto {
  conversations: UserConversationModel[];
}
