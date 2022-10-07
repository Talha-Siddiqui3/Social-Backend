
export class CreateUserDto {
  name?: string;
  profile_picture?: string;
  bio?: string;
  is_active?: boolean;
  phone_number: string;
  access_token: string;
}
