import { User } from '../models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateUserDto } from '../dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    create(user: CreateUserDto): User {
        return this.userRepository.create(user);
    }

    findById(id: string): Promise<User | null> {
        return this.userRepository.findOne(id);
    }

    findByEmail(email: string, options: FindOneOptions<User> = {}): Promise<User | null> {
        return this.userRepository.findOne({ email }, options);
    }

    find(): Promise<User[]> {
        return this.userRepository.find();
    }

    save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    remove(user: User): Promise<User> {
        return this.userRepository.remove(user);
    }
}
