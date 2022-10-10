import { IsNotEmpty } from 'class-validator';
import {OkPacket, RowDataPacket} from "mysql2";

export interface UserConversationDbModel extends RowDataPacket{
  readonly conversationID?: string;
  readonly name?: string;
  readonly image?: string;
  readonly last_message?: string;
  readonly last_message_sender_id?: string;
  readonly last_message_sent_date?: Date;
  readonly userID: string;
  readonly first_name: string;
  readonly last_name?: string;
  readonly profile_picture?: string;
  readonly phone_number: string;
  readonly is_active?: boolean;
}
