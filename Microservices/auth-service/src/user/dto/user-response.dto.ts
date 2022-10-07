import { Exclude, Expose } from 'class-transformer';
import { BaseResponseDto } from '../../dto/base-response.dto';

export class UserResponseDto extends BaseResponseDto {
  id: string;
  name?: string;
  profilePicture?: string;
  bio?: string;
  isActive?: boolean;
  phoneNumber?: string;
  accessToken?: string;
}
