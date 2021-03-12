import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(`${environment.api_uri}/posts`);
  }

  getPostsById(id: number) {
    return this.http.get<Post[]>(`${environment.api_uri}/users/${id}/posts`);
  }
}
