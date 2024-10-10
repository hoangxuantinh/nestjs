import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginInput } from './dto/create-auth.input';
import { UsersRepository } from 'src/common/database/repositories/user.repository';
import { comparePassword } from 'src/utils/password.util';
import jwt from 'jsonwebtoken'
import { AuthResponse } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private userRepo: UsersRepository) {}
  async login(payload: LoginInput): Promise<AuthResponse> {
    const { email, password  } = payload
    const user = await this.userRepo.findOne({ email })
    if(!user) {
      throw new BadRequestException('Email not found')
    }
    if(!comparePassword(password, user.password)) {
      throw new BadRequestException('Password not match')
    }
    const accessToken = jwt.sign({ foo: 'bar' }, 'privateKey', { expiresIn: '1h' });
    return {
      accessToken
    }
  }
}
