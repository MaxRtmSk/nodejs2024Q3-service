import { IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  artistId?: string | null;

  @IsOptional()
  @IsString()
  albumId?: string | null;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  duration?: number;
}
