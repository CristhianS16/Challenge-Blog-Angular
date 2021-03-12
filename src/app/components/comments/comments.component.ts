import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Comment } from '../../models/comment.model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  postId: number = 0;
  comments: Comment[] = [];
  viewSpinner: boolean = true;

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.viewSpinner = true;
    const id = Number(this.activatedRoute.snapshot.params.id);
    if (id) {
      this.postId = id;
      this.postsService.getCommentsOfPost(id).subscribe(
        (comments) => {
          this.comments = comments;
          this.viewSpinner = false;
        },
        (error) => console.log(error)
      );
    } else {
      this.location.back();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
