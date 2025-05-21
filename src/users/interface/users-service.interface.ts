import { UserCreateResponseDto, UserCreateDto, UserUpdateDto } from '../dto';
import { User } from '../schema/user.entity';

export interface IUsersService {
  createNewUser(createUserDto: UserCreateDto): Promise<UserCreateResponseDto>;
  findAll(): Promise<User[]>;
  findOne(userId: string): Promise<User>;
  update(userId: string, updateUserData: UserUpdateDto): Promise<any>;
  remove(userId: string): Promise<any>;
  findByEmail(email: string): Promise<any | null>;
  findById(userId: string): Promise<any | null>;
  updatePassword(userId: string, hashedPassword: string): Promise<any>;
}
