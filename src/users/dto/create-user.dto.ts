import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User login', example: 'john_doe' })
  @IsString()
  login: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsString()
  password: string;
}
