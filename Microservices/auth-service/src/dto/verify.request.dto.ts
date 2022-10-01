import { IsNotEmpty } from "class-validator";

export class VerifyRequestDto {
  @IsNotEmpty()
  readonly otpCode: string;
  @IsNotEmpty()
  readonly phoneNumber: string;
}
