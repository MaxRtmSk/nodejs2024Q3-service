import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @ApiPropertyOptional({
    description: 'Album name',
    example: 'Updated Album Name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Release year', example: 2024 })
  @IsOptional()
  @IsNumber()
  year?: number;

  @ApiPropertyOptional({ description: 'Artist ID', example: 'uuid-string' })
  @IsOptional()
  @IsUUID()
  artistId?: string | null;
}
