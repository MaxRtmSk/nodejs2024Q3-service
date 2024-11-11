import { Module } from '@nestjs/common';
import { FavoritesListenerService } from './favorites-listener.service';
import { FavoritesRepository } from '../favorites/favorites.repository';

@Module({
  providers: [FavoritesListenerService, FavoritesRepository],
  exports: [FavoritesListenerService],
})
export class FavoritesListenerModule {}
