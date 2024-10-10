import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from 'src/common/database/repositories/user.repository';
import { hashPassword } from 'src/utils/password.util';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserInput: CreateUserInput) {
    if(await this.usersRepository.findOne({ email: createUserInput.email })) {
      throw new BadRequestException('Email is already')
    }
    const hashPw = hashPassword(createUserInput.password)
    return this.usersRepository.create({ ...createUserInput, password: hashPw })
  }

  async findAll() {
    return await this.usersRepository.find({})
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
