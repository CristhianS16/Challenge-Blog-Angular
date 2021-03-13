import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/models/photo.model';
import { PhotosService } from 'src/app/services/photos.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {
  albumId: number;
  page: number = 1;
  photos: Photo[] = [];

  constructor(
    private photosService: PhotosService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params.id);
    if (id) {
      this.albumId = id;
      this.getPhotos(id, this.page);
    } else {
      this.location.back();
    }
  }

  getPhotos(id: number, page: number) {
    this.photosService.getPhotos(id, page).subscribe(
      (photos) => (this.photos = this.photos.concat(photos)),
      (error) => console.log(error)
    );
  }

  onScrollDown(): void {
    this.page++;
    this.getPhotos(this.albumId, this.page);
  }

  goBack(): void {
    this.location.back();
  }

  deletePhoto(id: number) {
    if (this.photos.length === 4) {
      this.onScrollDown();
    }
    this.photos = this.photos.filter((photo) => photo.id !== id);
  }

  openDialogOfPhoto(id: number) {
    this.photosService.getPhoto(id).subscribe(
      (photo) => {
        this.dialog.open(DialogComponent, {
          width: '450px',
          data: {
            albumId: photo.albumId,
            title: photo.title,
            url: photo.url,
          },
        });
      },
      (error) => console.log(error)
    );
  }
}
