import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersRepository } from 'src/common/database/repositories/user.repository';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/common/database/database.module';
import { User, UserSchema } from 'src/common/database/entities/user.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthResolver, AuthService, UsersRepository],
})
export class AuthModule {}
