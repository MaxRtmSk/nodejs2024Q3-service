import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('favorites')
@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, description: 'Return all favorites.' })
  getAllFavorites() {
    return this.favoritesService.findAll(
      this.artistsService,
      this.albumsService,
      this.tracksService,
    );
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiResponse({ status: 201, description: 'Track added to favorites.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  @HttpCode(201)
  addTrackToFavorites(@Param('id') id: string) {
    this.favoritesService.addTrackToFavorites(id, this.tracksService);
    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  @ApiOperation({ summary: 'Remove track from favorites' })
  @ApiResponse({ status: 204, description: 'Track removed from favorites.' })
  @ApiResponse({ status: 404, description: 'Track not found in favorites.' })
  @HttpCode(204)
  removeTrackFromFavorites(@Param('id') id: string) {
    this.favoritesService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiResponse({ status: 201, description: 'Album added to favorites.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  @HttpCode(201)
  addAlbumToFavorites(@Param('id') id: string) {
    this.favoritesService.addAlbumToFavorites(id, this.albumsService);
    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  @ApiOperation({ summary: 'Remove album from favorites' })
  @ApiResponse({ status: 204, description: 'Album removed from favorites.' })
  @ApiResponse({ status: 404, description: 'Album not found in favorites.' })
  @HttpCode(204)
  removeAlbumFromFavorites(@Param('id') id: string) {
    this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiResponse({ status: 201, description: 'Artist added to favorites.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  @HttpCode(201)
  addArtistToFavorites(@Param('id') id: string) {
    this.favoritesService.addArtistToFavorites(id, this.artistsService);
    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Remove artist from favorites' })
  @ApiResponse({ status: 204, description: 'Artist removed from favorites.' })
  @ApiResponse({ status: 404, description: 'Artist not found in favorites.' })
  @HttpCode(204)
  removeArtistFromFavorites(@Param('id') id: string) {
    this.favoritesService.removeArtistFromFavorites(id);
  }
}
