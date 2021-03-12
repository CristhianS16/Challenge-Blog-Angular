import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./components/users/users.module').then(
        (module) => module.UsersModule
      ),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./components/posts/posts.module').then(
        (module) => module.PostsModule
      ),
  },
  {
    path: 'posts/:id/comments',
    loadChildren: () =>
      import('./components/comments/comments.module').then(
        (module) => module.CommentsModule
      ),
  },
  {
    path: 'albumes',
    loadChildren: () =>
      import('./components/albums/albums.module').then(
        (module) => module.AlbumsModule
      ),
  },
  {
    path: 'todos',
    loadChildren: () =>
      import('./components/todos/todos.module').then(
        (module) => module.TodosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
