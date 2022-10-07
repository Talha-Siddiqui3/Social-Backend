import { BaseResponseDto } from './base-response.dto';
import { UserDataDto } from '../user/dto/user-data.dto';

export class VerifyResponseDto extends BaseResponseDto {
  accessToken: string;
  userData: UserDataDto;
}
