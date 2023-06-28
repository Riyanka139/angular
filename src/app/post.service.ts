import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PostService {
  error = new Subject<string>();
  url = "https://shopping-f9888-default-rtdb.firebaseio.com/post.json";
  constructor(private http: HttpClient) {}
  createAndStorePost(postData: Post) {
    this.http.post(this.url, postData, { observe: "response" }).subscribe(
      (responseData) => {
        console.log(responseData, "response");
      },
      (err) => {
        this.error.next(err.message);
      }
    );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams = searchParams.append("custome", "hi");
    return this.http
      .get<{ [key: string]: Post }>(this.url, {
        headers: new HttpHeaders({ "custome-header": "Hello" }),
        // params: new HttpParams().set('print','pretty')
        params: searchParams,
        responseType: 'json'
      })
      .pipe(
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
    // .pipe(
    //   map((response) => {
    //     const postarr: Post[] = [];
    //     for (const key in response) {
    //       postarr.push({ ...response[key], id: key });
    //     }
    //     return postarr;
    //   })
    // )
  }

  deletePost() {
    return this.http.delete(this.url, { observe: "events" }).pipe(
      tap((event) => {
        console.log(event);
        if (event.type === HttpEventType.Sent) {
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      })
    );
  }
}
