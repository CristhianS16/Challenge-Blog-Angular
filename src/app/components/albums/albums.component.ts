import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album.model';
import { AlbumsService } from 'src/app/services/albums.service';
import { UsersService } from 'src/app/services/users.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AlbumsComponent implements OnInit {
  page: number = 1;
  state: string = 'collapsed';
  userId: number;
  albums: Album[] = [];

  constructor(
    private albumsService: AlbumsService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params.id);
    if (id) {
      this.userId = id;
      this.albumsService.getAlbumsById(id).subscribe(
        (albums) => {
          this.albums = albums;
          this.albums.map((album) => (album.state = 'collapsed'));
        },
        (error) => console.log(error)
      );
    } else {
      this.getAllAlbums(this.page);
    }
  }

  getAllAlbums(page: number) {
    this.albumsService.getAlbums(page).subscribe(
      (albums) => {
        this.albums = this.albums.concat(albums);
        this.albums.map((album) => (album.state = 'collapsed'));
      },
      (error) => console.log(error)
    );
  }

  onScrollDown(): void {
    if (!this.userId) {
      this.page++;
      this.getAllAlbums(this.page);
    }
  }

  toggle(album: Album): void {
    album.state = album.state === 'collapsed' ? 'expanded' : 'collapsed';
  }

  openDialogOfUser(id: number) {
    this.usersService.getUser(id).subscribe(
      (user) => {
        this.dialog.open(DialogComponent, {
          width: '450px',
          data: {
            name: user.name,
            website: user.website,
            company: user.company,
          },
        });
      },
      (error) => console.log(error)
    );
  }
}
