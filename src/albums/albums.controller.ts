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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { isUUID } from 'class-validator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('album')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, description: 'Return all albums.' })
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by id' })
  @ApiResponse({ status: 200, description: 'Return album by id.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    return this.albumsService.findOneOrFail(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new album' })
  @ApiResponse({ status: 201, description: 'Album successfully created.' })
  @ApiResponse({ status: 400, description: 'Missing required fields.' })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiResponse({ status: 200, description: 'Album successfully updated.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({ status: 204, description: 'Album successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  remove(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    this.albumsService.remove(id);
  }
}
