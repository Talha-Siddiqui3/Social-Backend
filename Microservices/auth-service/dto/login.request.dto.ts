import { IsNotEmpty } from "class-validator";

export class LoginRequestDto {
  @IsNotEmpty()
  readonly phoneNumber: string;
}
