import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  constructor(private http: HttpClient) {}

  getPhotos(id: number, page: number) {
    return this.http.get<Photo[]>(
      `${environment.api_uri}/albums/${id}/photos?_page=${page}`
    );
  }
}
