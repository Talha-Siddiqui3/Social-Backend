import { IsNotEmpty } from 'class-validator';
import { BaseResponseDto } from '../../dto/base-response.dto';
import { UserContactsModel } from '../models/user-contacts-model';

export class UserContactsResponseDto extends BaseResponseDto {
  @IsNotEmpty()
  readonly userContacts: UserContactsModel[];
}
