import { BaseResponseDto } from '../../dto/base.response.dto';

export class UserResponseDto extends BaseResponseDto {
  name?: string;
  profilePicture?: string;
  bio?: string;
  isActive?: boolean;
  phoneNumber?: string;
  accessToken?: string;
}
