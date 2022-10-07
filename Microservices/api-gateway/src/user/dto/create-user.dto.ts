
export class CreateUserDto {
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  bio?: string;
  isActive?: boolean;
  phoneNumber: string;
  accessToken: string;
}
