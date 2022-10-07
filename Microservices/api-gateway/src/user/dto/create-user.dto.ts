
export class CreateUserDto {
  name?: string;
  profilePicture?: string;
  bio?: string;
  isActive?: boolean;
  phoneNumber: string;
  accessToken: string;
}
