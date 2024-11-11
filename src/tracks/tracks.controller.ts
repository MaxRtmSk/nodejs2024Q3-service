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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { isUUID } from 'class-validator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, description: 'Return all tracks.' })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by id' })
  @ApiResponse({ status: 200, description: 'Return track by id.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.tracksService.findOneOrFail(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new track' })
  @ApiResponse({ status: 201, description: 'Track successfully created.' })
  @ApiResponse({ status: 400, description: 'Missing required fields.' })
  create(@Body() createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || createTrackDto.duration === undefined) {
      throw new BadRequestException('Missing required fields');
    }
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiResponse({ status: 200, description: 'Track successfully updated.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({ status: 204, description: 'Track successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  remove(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    this.tracksService.remove(id);
  }
}
