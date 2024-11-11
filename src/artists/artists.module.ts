import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { FavoritesListenerModule } from 'src/favorites-listener/favorites-listener.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [FavoritesListenerModule, TracksModule, AlbumsModule],
  exports: [ArtistsService],
})
export class ArtistsModule {}
