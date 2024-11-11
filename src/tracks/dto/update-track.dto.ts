import { IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiPropertyOptional({
    description: 'Track name',
    example: 'Updated Song Name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Artist ID', example: 'uuid-string' })
  @IsOptional()
  @IsString()
  artistId?: string | null;

  @ApiPropertyOptional({ description: 'Album ID', example: 'uuid-string' })
  @IsOptional()
  @IsString()
  albumId?: string | null;

  @ApiPropertyOptional({
    description: 'Track duration in seconds',
    example: 200,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  duration?: number;
}
