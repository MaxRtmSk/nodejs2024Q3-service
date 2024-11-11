import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { isUUID } from 'class-validator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('artist')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, description: 'Return all artists.' })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by id' })
  @ApiResponse({ status: 200, description: 'Return artist by id.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.artistsService.findOneOrFail(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new artist' })
  @ApiResponse({ status: 201, description: 'Artist successfully created.' })
  @ApiResponse({ status: 400, description: 'Missing required fields.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name || createArtistDto.grammy === undefined) {
      throw new BadRequestException('Missing required fields');
    }
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiResponse({ status: 200, description: 'Artist successfully updated.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID or missing fields.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if (Object.keys(updateArtistDto).length === 0) {
      throw new BadRequestException('Missing required fields');
    }

    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artist' })
  @ApiResponse({ status: 204, description: 'Artist successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    this.artistsService.remove(id);
  }
}
