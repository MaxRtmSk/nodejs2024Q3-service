import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateArtistDto {
  @ApiPropertyOptional({ description: 'Artist name', example: 'Updated Name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Grammy award winner', example: false })
  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}
