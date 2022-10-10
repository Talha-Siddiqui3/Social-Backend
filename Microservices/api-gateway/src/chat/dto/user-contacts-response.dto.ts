import { IsNotEmpty } from 'class-validator';

import {BaseResponseDto} from "../../dto/base.response.dto";
import {UserContactModel} from "../models/user-contact.model";

export class UserContactsResponseDto extends BaseResponseDto {
  @IsNotEmpty()
  readonly userContacts: UserContactModel[];
}
