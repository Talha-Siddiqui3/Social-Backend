import { BaseResponseDto } from './base-response.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto extends BaseResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  profile_picture: string;

  @Expose()
  bio: string;

  @Expose()
  is_active: boolean;

  @Expose()
  phone_number: string;

  @Expose()
  access_token: string;
}
