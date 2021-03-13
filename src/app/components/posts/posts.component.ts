import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { UsersService } from 'src/app/services/users.service';
import { PostsService } from '../../services/posts.service';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  inputTitleValue: string;
  inputIdValue: number;
  idParam: boolean = false;
  viewSpinner: boolean = true;
  generalPostsFilterSuccess: boolean = true;
  page: number = 1;
  posts: Post[] = [];
  filterPostById: Post[] = [];
  filteredPosts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params.id);
    if (id) {
      this.inputIdValue = id;
      this.idParam = true;
      this.filterById();
    } else {
      this.getAllPosts(this.page);
    }
  }

  onScrollDown(): void {
    if (!this.inputIdValue) {
      this.page++;
      this.getAllPosts(this.page);
    }
  }

  getAllPosts(page: number) {
    this.viewSpinner = true;
    this.postsService.getPosts(page).subscribe(
      (posts) => {
        this.posts = this.posts.concat(posts);
        if (this.inputTitleValue) {
          this.onChangeInputTitle();
        }
        this.viewSpinner = false;
      },
      (error) => console.log(error)
    );
  }

  onChangeInputTitle(): void {
    this.viewSpinner = true;
    this.filterByTitle();
    this.viewSpinner = false;
  }

  filterByTitle(): Post[] | any {
    if (this.inputTitleValue && this.inputIdValue) {
      this.filteredPosts = this.filterPostById.filter((post) =>
        post.title.includes(this.inputTitleValue)
      );
    } else if (this.inputTitleValue) {
      this.filteredPosts = this.posts.filter((post) =>
        post.title.includes(this.inputTitleValue)
      );
      if (!this.filteredPosts.length) {
        this.generalPostsFilterSuccess = false;
      } else {
        this.generalPostsFilterSuccess = true;
      }
    } else if (this.inputIdValue) {
      this.filterById();
    } else {
      this.generalPostsFilterSuccess = true;
      this.page = 1;
      this.posts = [];
      this.getAllPosts(this.page);
    }
  }
  filterById(): void {
    this.viewSpinner = true;
    if (this.inputIdValue) {
      this.postsService.getPostsById(this.inputIdValue).subscribe(
        (posts) => {
          this.filterPostById = posts;
          this.filteredPosts = this.filterPostById;
          this.viewSpinner = false;
          if (this.inputTitleValue) {
            this.onChangeInputTitle();
          }
        },
        (error) => console.log(error)
      );
    } else {
      this.page = 1;
      this.posts = [];
      this.getAllPosts(this.page);
    }
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

  goBack(): void {
    this.location.back();
  }
}
