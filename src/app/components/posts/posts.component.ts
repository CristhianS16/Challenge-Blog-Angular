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
  inputIdValue: number = 0;
  viewSpinner: boolean = true;
  page: number = 1;
  posts: Post[] = [];
  filterPosts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.viewSpinner = true;
    if (this.activatedRoute.params) {
      const params = this.activatedRoute.snapshot.params;
      this.inputIdValue = Number(params.id);
    }
    if (this.inputIdValue) {
      this.postsService.getPostsById(this.inputIdValue).subscribe(
        (posts) => {
          this.posts = posts;
          this.viewSpinner = false;
        },
        (error) => console.log(error)
      );
    } else {
      this.getAllPosts(this.page);
    }
  }

  onScrollDown(): void {
    this.page++;
    this.getAllPosts(this.page);
  }

  getAllPosts(page: number) {
    this.viewSpinner = true;
    this.postsService.getPosts(page).subscribe(
      (posts) => {
        this.posts = this.posts.concat(posts);
        this.viewSpinner = false;
      },
      (error) => console.log(error)
    );
  }

  onChangeInputTitle(): void {
    this.viewSpinner = true;
    this.filterPosts = this.filterByTitle();
    this.viewSpinner = false;
  }

  filterByTitle(): Post[] | any {
    if (this.inputTitleValue) {
      const posts: Post[] = [];
      this.posts.map((post) => {
        if (post.title.match(this.inputTitleValue)) {
          posts.push(post);
        }
      });
      return posts;
    }
    return this.posts;
  }
  filterById(): void {
    this.viewSpinner = true;
    if (this.inputIdValue) {
      this.postsService.getPostsById(this.inputIdValue).subscribe(
        (posts) => {
          this.posts = posts;
          this.viewSpinner = false;
          this.onChangeInputTitle();
        },
        (error) => console.log(error)
      );
    } else {
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
}
