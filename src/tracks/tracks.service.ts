import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesListenerService } from 'src/favorites-listener/favorites-listener.service';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  constructor(private favoritesListenerService: FavoritesListenerService) {}

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track | undefined {
    return this.tracks.find((track) => track.id === id);
  }

  findOneOrFail(id: string): Track {
    const track = this.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    Object.assign(track, updateTrackDto);
    return track;
  }

  remove(id: string): void {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    this.tracks.splice(trackIndex, 1);
    this.favoritesListenerService.handleTrackRemoved(id);
  }
}
