import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'Current password', example: 'oldpass123' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: 'New password', example: 'newpass123' })
  @IsString()
  newPassword: string;
}
