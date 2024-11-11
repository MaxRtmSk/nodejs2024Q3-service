import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../favorites/favorites.repository';

@Injectable()
export class FavoritesListenerService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  handleTrackRemoved(trackId: string): void {
    this.favoritesRepository.removeTrack(trackId);
  }

  handleAlbumRemoved(albumId: string): void {
    this.favoritesRepository.removeAlbum(albumId);
  }

  handleArtistRemoved(artistId: string): void {
    this.favoritesRepository.removeArtist(artistId);
  }
}
