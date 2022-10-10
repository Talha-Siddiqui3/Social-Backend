import { IsNotEmpty } from 'class-validator';
import { UserModel } from './user.model';

export class UserConversationModel {
  @IsNotEmpty()
  readonly id: string;
  readonly name?: string; //If it's a group chat
  readonly image?: string; //If it's a group chat
  readonly users: UserModel[];
  readonly lastSentMessage?: string;
  readonly lastSentMessageUserID?: string;
  readonly lastSentMessageDate?: Date;
}
