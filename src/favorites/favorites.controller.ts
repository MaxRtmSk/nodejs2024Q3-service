import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.findAll(
      this.artistsService,
      this.albumsService,
      this.tracksService,
    );
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrackToFavorites(@Param('id') id: string) {
    this.favoritesService.addTrackToFavorites(id, this.tracksService);
    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavorites(@Param('id') id: string) {
    this.favoritesService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbumToFavorites(@Param('id') id: string) {
    this.favoritesService.addAlbumToFavorites(id, this.albumsService);
    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavorites(@Param('id') id: string) {
    this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtistToFavorites(@Param('id') id: string) {
    this.favoritesService.addArtistToFavorites(id, this.artistsService);
    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavorites(@Param('id') id: string) {
    this.favoritesService.removeArtistFromFavorites(id);
  }
}
