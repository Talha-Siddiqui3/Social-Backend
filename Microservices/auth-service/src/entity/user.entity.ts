import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  profile_picture: string;

  @Column()
  bio: string;

  @Column()
  isActive: boolean;

  @Column()
  phone_number: string;

  @Column()
  access_token: string;
}
