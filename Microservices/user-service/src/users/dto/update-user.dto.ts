import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {MemoryStoredFile} from "nestjs-form-data";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
  profilePictureFile: MemoryStoredFile
}
