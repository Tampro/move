import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) protected readonly userRepository: Repository<User>
    ) {
    }

    async save(body) {
        return this.userRepository.save(body);
    }

    async findOne(id) {
        return await this.userRepository.findOne({ id });
    }

    async me(id) {
        return await this.userRepository.findOne(id,  {relations : ["profile"]});
    }

    public async hashPassword(password: string): Promise<string> {
        return await bcryptjs.hash(password, 12);
    }

    public async compare(password: string, userPassword: string): Promise<boolean> {
        return await bcryptjs.compare(password, userPassword);
    }
}
