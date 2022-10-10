import { IsNotEmpty } from 'class-validator';

export class UserContactModel {
  @IsNotEmpty()
  readonly contactFirstName: string;
  readonly contactLastName?: string;
  @IsNotEmpty()
  readonly contactUserID: string;
  @IsNotEmpty()
  readonly contactNumber: string;
  readonly contactUserImage?: string;
}
