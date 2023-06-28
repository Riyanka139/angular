import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "./post.model";
import { PostService } from "./post.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  errorSub: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe((errMsg) => {
      this.error = errMsg;
    });

    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (data) => {
        this.loadedPosts = Object.entries(data).map((key) => {
          return { id: key[0], ...key[1] };
        });
        this.isFetching = false;
      },
      (error) => {
        this.isFetching = false
        this.error = error.message;
      }
    );
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe((data) => {
      this.loadedPosts = Object.entries(data).map((key) => {
        return { id: key[0], ...key[1] };
      });
      this.isFetching = false;
      this.error = null
    },(error) => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePost().subscribe((res) => {
      console.log(res);
      this.loadedPosts = [];
    });
  }

  handleError(){
    this.error = null
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
