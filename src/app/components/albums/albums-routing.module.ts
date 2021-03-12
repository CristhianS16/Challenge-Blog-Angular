import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from '../photos/photos.component';
import { AlbumsComponent } from './albums.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumsComponent,
  },
  {
    path: ':id',
    component: AlbumsComponent,
  },
  {
    path: ':id/fotos',
    component: PhotosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumsRoutingModule {}
