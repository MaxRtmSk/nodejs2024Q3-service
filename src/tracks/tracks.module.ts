import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavoritesListenerModule } from 'src/favorites-listener/favorites-listener.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [FavoritesListenerModule],
  exports: [TracksService],
})
export class TracksModule {}
