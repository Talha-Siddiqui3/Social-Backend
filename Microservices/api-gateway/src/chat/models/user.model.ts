import { IsNotEmpty } from 'class-validator';

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
}
