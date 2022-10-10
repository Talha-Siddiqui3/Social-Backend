import { IsNotEmpty } from 'class-validator';
import { UserModel } from './user.model';
import { UserConversationDbModel } from './user-conversation-db.model';

export class UserConversationModel {
  @IsNotEmpty()
  readonly id: string;
  readonly name?: string; //If it's a group chat
  readonly image?: string; //If it's a group chat
  readonly users: UserModel[];
  readonly lastSentMessage?: string;
  readonly lastSentMessageUserID?: string;
  readonly lastSentMessageDate?: Date;

  constructor(userConversationsDbModels?: UserConversationDbModel[]) {
    this.id = userConversationsDbModels?.[0]?.conversationID;
    this.name = userConversationsDbModels?.[0]?.name;
    this.image = userConversationsDbModels[0]?.image;
    this.users = userConversationsDbModels.map(userConversationsDbModel=>{
      return new UserModel(userConversationsDbModel)
    })
    this.lastSentMessage = userConversationsDbModels[0]?.last_message;
    this.lastSentMessageUserID =
      userConversationsDbModels[0]?.last_message_sender_id;
    this.lastSentMessageDate =
      userConversationsDbModels[0]?.last_message_sent_date;
  }
}
