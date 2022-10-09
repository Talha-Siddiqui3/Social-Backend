import { IsNotEmpty } from 'class-validator';

export class UserContactsModel {
  @IsNotEmpty()
  contactFirstName: string;
  contactLastName?: string;
  @IsNotEmpty()
  contactUserID: string;
  @IsNotEmpty()
  contactNumber: string;
  contactUserImage?: string;
}
