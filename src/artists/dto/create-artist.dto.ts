import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({ description: 'Artist name', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Grammy award winner', example: true })
  @IsBoolean()
  grammy: boolean;
}
