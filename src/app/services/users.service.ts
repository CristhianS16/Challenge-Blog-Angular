import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${environment.api_uri}/users/`);
  }

  getUser(id: number) {
    return this.http.get<User>(`${environment.api_uri}/users/${id}`);
  }
}
