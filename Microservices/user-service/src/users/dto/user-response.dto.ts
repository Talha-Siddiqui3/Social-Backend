import { BaseResponseDto } from './base-response.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto extends BaseResponseDto {
  id: string;
  name: string;
  profilePicture: string;
  bio: string;
  isActive: boolean;
  phoneNumber: string;
  accessToken: string;
}
