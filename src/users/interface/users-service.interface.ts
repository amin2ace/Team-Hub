import { ObjectId } from 'typeorm';
import { UserCreateDto, UserUpdateDto } from '../dto';
import { User } from '../schema/user.entity';

export interface IUsersService {
  createNewUser(createUserDto: UserCreateDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(userId: string): Promise<User>;
  update(userId: ObjectId, updateUserData: UserUpdateDto): Promise<User>;
  remove(userId: string): Promise<any>;
  findByEmail(email: string): Promise<any | null>;
  findById(userId: string): Promise<any | null>;
  updatePassword(userId: string, hashedPassword: string): Promise<any>;
}
