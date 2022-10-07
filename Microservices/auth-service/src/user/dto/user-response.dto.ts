import { BaseResponseDto } from '../../dto/base-response.dto';

export class UserResponseDto extends BaseResponseDto {
  id: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  bio?: string;
  isActive?: boolean;
  phoneNumber?: string;
  accessToken?: string;
}
