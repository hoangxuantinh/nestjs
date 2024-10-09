import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UsersRepository } from 'src/common/database/repositories/user.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { User, UserSchema } from 'src/common/database/entities/user.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),

  ],
  providers: [UserResolver, UserService, UsersRepository],
})
export class UserModule {}
