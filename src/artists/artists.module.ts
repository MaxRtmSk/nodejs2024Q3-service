import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { FavoritesListenerModule } from 'src/favorites-listener/favorites-listener.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [FavoritesListenerModule],
  exports: [ArtistsService],
})
export class ArtistsModule {}
