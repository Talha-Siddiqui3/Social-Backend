import { BaseResponseDto } from '../../dto/base-response.dto';
import { UserConversationModel } from '../models/user-conversation.model';

export class UserConversationsResponseDto extends BaseResponseDto {
  conversations: UserConversationModel[];
}
