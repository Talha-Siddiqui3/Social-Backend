import { IsNotEmpty } from 'class-validator';


export class UserContactsRequestDto {
  @IsNotEmpty()
  readonly userID: string;
  @IsNotEmpty()
  readonly userContacts: string[];
}
