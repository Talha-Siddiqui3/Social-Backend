import { Exclude, Expose } from 'class-transformer';
import { BaseResponseDto } from '../../dto/base-response.dto';

export class UserDataDto {
  id: string;
  name?: string;
  profile_picture?: string;
  bio?: string;
  is_active?: boolean;
  phone_number?: string;
}
