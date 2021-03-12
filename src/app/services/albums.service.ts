import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../models/album.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor(private http: HttpClient) {}

  getAlbums(page: number) {
    return this.http.get<Album[]>(
      `${environment.api_uri}/albums?_page=${page}`
    );
  }

  getAlbumsById(id: number) {
    return this.http.get<Album[]>(`${environment.api_uri}/users/${id}/albums`);
  }
}
