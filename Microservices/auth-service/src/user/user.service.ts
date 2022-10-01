import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createUser(phoneNumber: string) {
    const user = new User();
    user.phone_number = phoneNumber;
    return this.usersRepository.save(user);
  }

  findUser(phoneNumber: string): Promise<User> {
    return this.usersRepository.findOneBy({ phone_number: phoneNumber });
  }

  updateUser(user:User) {
    return this.usersRepository.update({id:user.id}, user)
  }
}
