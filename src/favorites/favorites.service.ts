import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesResponse } from './favorites.response';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  findAll(
    artistsService: any,
    albumsService: AlbumsService,
    tracksService: any,
  ): FavoritesResponse {
    const favorites = this.favoritesRepository.findAll();
    return {
      artists: favorites.artists.map((id) => artistsService.findOne(id)),
      albums: favorites.albums.map((id) => albumsService.findOne(id)),
      tracks: favorites.tracks.map((id) => tracksService.findOne(id)),
    };
  }

  addTrackToFavorites(trackId: string, tracksService: any): void {
    if (!uuidValidate(trackId)) {
      throw new BadRequestException('Invalid track ID');
    }
    const track = tracksService.findOne(trackId);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    this.favoritesRepository.addTrack(trackId);
  }

  removeTrackFromFavorites(trackId: string): void {
    if (!uuidValidate(trackId)) {
      throw new BadRequestException('Invalid track ID');
    }
    this.favoritesRepository.removeTrack(trackId);
  }

  addAlbumToFavorites(albumId: string, albumsService: AlbumsService): void {
    if (!uuidValidate(albumId)) {
      throw new BadRequestException('Invalid album ID');
    }
    const album = albumsService.findOne(albumId);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    this.favoritesRepository.addAlbum(albumId);
  }

  removeAlbumFromFavorites(albumId: string): void {
    if (!uuidValidate(albumId)) {
      throw new BadRequestException('Invalid album ID');
    }
    this.favoritesRepository.removeAlbum(albumId);
  }

  addArtistToFavorites(artistId: string, artistsService: any): void {
    if (!uuidValidate(artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }
    const artist = artistsService.findOne(artistId);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    this.favoritesRepository.addArtist(artistId);
  }

  removeArtistFromFavorites(artistId: string): void {
    if (!uuidValidate(artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }
    this.favoritesRepository.removeArtist(artistId);
  }
}
