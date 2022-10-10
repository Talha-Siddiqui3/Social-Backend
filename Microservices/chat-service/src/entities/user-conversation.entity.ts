import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'UserConversation' })
export class UserConversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null, name: 'user_id' })
  userID: string;

  @Column({ default: null, name: 'conversation_id' })
  conversationID: string;

  @Column({ default: null, name: 'last_message_seen' })
  lastMessageSeen: boolean;
}
