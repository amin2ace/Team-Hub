import { Injectable } from '@nestjs/common';
import { IUsersService } from './interface/users-service.interface';
import { UserCreateDto, UserUpdateDto } from './dto';
import { User } from './schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async createNewUser(createUserDto: UserCreateDto): Promise<User> {
    const { email, password, phoneNumber, username } = createUserDto;

    const user = this.userRepo.create({
      email,
      password,
      phoneNumber,
      username,
    });

    return this.userRepo.save(user);
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findOne(userId: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async update(user: User, updateUserData: UserUpdateDto): Promise<any> {
    const updatedUser = await this.userRepo.update(
      { _id: userId },
      { password: updateUserData.password },
    );
  }
  remove(userId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User | null> {
    const user = this.userRepo.findOne({
      where: {
        email,
      },
    });

    return user;
  }
  findById(userId: string): Promise<any | null> {
    throw new Error('Method not implemented.');
  }
  updatePassword(userId: string, hashedPassword: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
