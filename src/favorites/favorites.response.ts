import { Album } from 'src/albums/album.interface';
import { Artist } from 'src/artists/artist.interface';
import { Track } from 'src/tracks/track.interface';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
