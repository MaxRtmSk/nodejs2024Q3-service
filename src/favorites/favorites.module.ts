import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesRepository } from './favorites.repository';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  imports: [AlbumsModule, ArtistsModule, TracksModule],
  exports: [FavoritesService],
})
export class FavoritesModule {}
