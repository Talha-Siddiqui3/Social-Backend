import { IsNotEmpty } from 'class-validator';
import { BaseResponseDto } from '../../dto/base-response.dto';

export class UserContactsRequestDto extends BaseResponseDto {
  @IsNotEmpty()
  readonly userID: string;
  @IsNotEmpty()
  readonly userContacts: string[];
}
