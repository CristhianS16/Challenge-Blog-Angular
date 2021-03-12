import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from '../../services/posts.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  inputTitleValue: string;
  inputIdValue: number = 0;
  posts: Post[] = [];
  filterPosts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.params) {
      const params = this.activatedRoute.snapshot.params;
      this.inputIdValue = Number(params.id);
    }
    if (this.inputIdValue) {
      this.postsService.getPostsById(this.inputIdValue).subscribe(
        (posts) => (this.posts = posts),
        (error) => console.log(error)
      );
    }
    this.postsService.getPosts().subscribe(
      (posts) => (this.posts = posts),
      (error) => console.log(error)
    );
  }

  filterByTitle(): void {
    this.filterPosts = this.onChangeInputTitle();
  }

  onChangeInputTitle(): Post[] | any {
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
    if (this.inputIdValue) {
      this.postsService.getPostsById(this.inputIdValue).subscribe(
        (posts) => {
          this.posts = posts;
          this.filterByTitle();
        },
        (error) => console.log(error)
      );
    }
  }
}
