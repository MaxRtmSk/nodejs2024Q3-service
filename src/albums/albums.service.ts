import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavoritesListenerService } from 'src/favorites-listener/favorites-listener.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(private favoritesListenerService: FavoritesListenerService) {}

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album | undefined {
    return this.albums.find((album) => album.id === id);
  }

  findOneOrFail(id: string): Album {
    const album = this.findOne(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    Object.assign(album, updateAlbumDto);
    return album;
  }

  remove(id: string): void {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    this.albums.splice(albumIndex, 1);
    this.favoritesListenerService.handleAlbumRemoved(id);
  }
}
