import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({ description: 'Album name', example: 'Greatest Hits' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Release year', example: 2023 })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiPropertyOptional({ description: 'Artist ID', example: 'uuid-string' })
  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
