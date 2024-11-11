import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavoritesListenerService } from 'src/favorites-listener/favorites-listener.service';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  constructor(
    private favoritesListenerService: FavoritesListenerService,
    private tracksService: TracksService,
    private albumsService: AlbumsService,
  ) {}

  findAll(): Artist[] {
    return this.artists;
  }
  findOneOrFail(id: string): Artist {
    const artist = this.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  findOne(id: string): Artist | undefined {
    return this.artists.find((artist) => artist.id === id);
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  remove(id: string): void {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const tracks = this.tracksService.findAll();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        this.tracksService.update(track.id, { artistId: null });
      }
    });

    const albums = this.albumsService.findAll();
    albums.forEach((album) => {
      if (album.artistId === id) {
        this.albumsService.update(album.id, { artistId: null });
      }
    });

    this.favoritesListenerService.handleArtistRemoved(id);
    this.artists.splice(artistIndex, 1);
  }
}
