import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ description: 'Track name', example: 'My Song' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Artist ID', example: 'uuid-string' })
  @IsOptional()
  @IsString()
  artistId: string | null;

  @ApiPropertyOptional({ description: 'Album ID', example: 'uuid-string' })
  @IsOptional()
  @IsString()
  albumId: string | null;

  @ApiProperty({ description: 'Track duration in seconds', example: 180 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  duration: number;
}
