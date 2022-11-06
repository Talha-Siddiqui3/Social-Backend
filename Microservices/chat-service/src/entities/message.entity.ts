import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Message' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null, name: 'user_id' })
  userID: string;

  @Column({ default: null, name: 'message' })
  message: string;

  @Column({ default: null, name: 'conversation_id' })
  conversationID: string;

  @Column({ default: null, name: 'created_at' })
  createdAt: Date;
}
