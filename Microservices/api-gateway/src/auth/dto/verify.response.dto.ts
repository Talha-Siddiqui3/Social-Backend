import {BaseResponseDto} from "../../dto/base.response.dto";

export class VerifyResponseDto extends BaseResponseDto {
  accessToken:string;
  error?: string;
}
