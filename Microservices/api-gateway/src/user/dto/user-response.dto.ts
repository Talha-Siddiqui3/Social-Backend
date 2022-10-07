import { BaseResponseDto } from '../../dto/base.response.dto';

export class UserResponseDto extends BaseResponseDto {
  readonly id: string;
  readonly name?: string;
  readonly profilePicture?: string;
  readonly bio?: string;
  readonly isActive?: boolean;
  readonly phoneNumber?: string;
}
