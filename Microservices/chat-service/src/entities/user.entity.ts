import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null, name: 'first_name' })
  firstName: string;

  @Column({ default: null, name: 'last_name' })
  lastName: string;

  @Column({ default: null, name: 'profile_picture' })
  profilePicture: string;

  @Column({ default: null })
  bio: string;

  @Column({ default: null, name: 'is_active' })
  isActive: boolean;

  @Column({ default: null, name: 'phone_number' })
  phoneNumber: string;

  @Column({ default: null, name: 'access_token' })
  accessToken: string;
}
