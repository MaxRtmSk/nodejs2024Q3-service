import { Injectable } from '@nestjs/common';
import { Favorites } from './favorites.interface';
import { favorites } from './favorites';

@Injectable()
export class FavoritesRepository {
  findAll(): Favorites {
    return favorites;
  }

  addTrack(trackId: string): void {
    favorites.tracks.push(trackId);
  }

  removeTrack(trackId: string): void {
    const index = favorites.tracks.indexOf(trackId);
    if (index !== -1) {
      favorites.tracks.splice(index, 1);
    }
  }

  addAlbum(albumId: string): void {
    favorites.albums.push(albumId);
  }

  removeAlbum(albumId: string): void {
    const index = favorites.albums.indexOf(albumId);
    if (index !== -1) {
      favorites.albums.splice(index, 1);
    }
  }

  addArtist(artistId: string): void {
    favorites.artists.push(artistId);
  }

  removeArtist(artistId: string): void {
    const index = favorites.artists.indexOf(artistId);
    if (index !== -1) {
      favorites.artists.splice(index, 1);
    }
  }
}
