import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto, UserUpdateDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  async create(@Body() createUserDto: UserCreateDto) {}

  @Get('/all')
  async findAll() {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {}

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UserUpdateDto) {}

  @Delete('/delete:id')
  async remove(@Param('id') id: string) {}
}
