import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesListenerModule } from 'src/favorites-listener/favorites-listener.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [FavoritesListenerModule, TracksModule],
  exports: [AlbumsService],
})
export class AlbumsModule {}
