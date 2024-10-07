import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  APP_PORT: number;

  @IsNotEmpty()
  @IsString()
  MONGO_PASS: string;

  @IsNotEmpty()
  @IsString()
  MONGO_USER: string;

  @IsNotEmpty()
  @IsNumber()
  MONGO_PORT: number;

  @IsNotEmpty()
  @IsString()
  MONGO_HOST: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    const host = this.configService.get<string>('MONGO_HOST');
    const port = this.configService.get<string>('MONGO_PORT');
    // const dbName = this.configService.get<string>('MONGO_DB');
    const user = this.configService.get<string>('MONGO_USER');
    const pass = this.configService.get<string>('MONGO_PASS');
    return {
      uri: `mongodb://${user}:${pass}@${host}:${port}?authSource=admin`,
    };
  }
}
