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

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.tracksService.findOneOrFail(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || createTrackDto.duration === undefined) {
      throw new BadRequestException('Missing required fields');
    }
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    this.tracksService.remove(id);
  }
}
