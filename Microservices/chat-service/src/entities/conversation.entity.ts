import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Conversation' })
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null, name: 'last_message' })
  lastMessage: string;

  @Column({ default: null, name: 'last_message_sender_id' })
  lastMessageSenderID: string;

  @Column({ default: null, name: 'name' })
  name: string;
}
