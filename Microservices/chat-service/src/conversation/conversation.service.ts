import {Injectable} from '@nestjs/common';
import {UserContactsRequestDto} from './dto/user-contacts-request.dto';
import {UserContactsResponseDto} from './dto/user-contacts-response.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In} from 'typeorm';
import {User} from "../entities/user.entity";

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    async getUserContacts(
        userContactsRequestDto: UserContactsRequestDto,
    ): Promise<UserContactsResponseDto> {
        const users = await this.usersRepository.find({
            where: {phoneNumber: In(userContactsRequestDto.userContacts)},
            order: {firstName: 'ASC'},
        });
        const userContacts = users.map(user => {
            return {
                contactFirstName: user.firstName,
                contactLastName: user.lastName,
                contactUserID: user.id,
                contactNumber: user.phoneNumber,
                contactUserImage: user.profilePicture,
            }
        })
        return {
            success: true,
            userContacts:userContacts
        }
    }
}
