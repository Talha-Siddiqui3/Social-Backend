import { IsNotEmpty } from 'class-validator';
import { UserConversationDbModel } from './user-conversation-db.model';

export class UserModel {
  @IsNotEmpty()
  readonly id: string;
  @IsNotEmpty()
  readonly firstName: string;
  readonly lastName?: string;
  readonly profilePicture?: string;
  readonly bio?: string;
  @IsNotEmpty()
  readonly phoneNumber: string;
  readonly isActive?: boolean;

  constructor(userConversationsDbModel?: UserConversationDbModel) {
    this.id = userConversationsDbModel?.userID;
    this.firstName = userConversationsDbModel?.first_name;
    this.lastName = userConversationsDbModel?.last_name;
    this.profilePicture = userConversationsDbModel?.profile_picture;
    this.bio = null
    this.phoneNumber = userConversationsDbModel?.phone_number;
    this.isActive = userConversationsDbModel?.is_active ?? false;
  }
}
