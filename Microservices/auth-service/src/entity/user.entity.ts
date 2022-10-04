import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  profile_picture: string;

  @Column({ default: null })
  bio: string;

  @Column({ default: null })
  is_active: boolean;

  @Column({ default: null })
  phone_number: string;

  @Column({ default: null })
  access_token: string;
}
