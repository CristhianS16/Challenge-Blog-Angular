import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/posts/posts.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { TodosComponent } from './components/todos/todos.component';
import { CustomTitleComponent } from './components/custom-title/custom-title.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    PostsComponent,
    AlbumsComponent,
    TodosComponent,
    CustomTitleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
