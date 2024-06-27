import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { PostService } from "./post.service";
import { HttpClient } from "@angular/common/http";

@Component({
    selector:'app-comp',
    templateUrl:'./app.component.html',
    styleUrl:'./app.component.css',
    standalone:true,
    imports:[FormsModule,NgFor,NgIf]
})
export class AppComponent implements OnInit {
    loadedPosts :Post[] =[];
  
    constructor(private postService:PostService,private http:HttpClient) {}
  
    ngOnInit() {}
  
    onCreatePost(postData: Post) {
      // Send Http request
      this.postService.createStorePost(postData)
    
    }
  
    onFetchPosts() {
      this.http.get<{ [key: string]: Post }>('https://ng-http-starter-c803d-default-rtdb.firebaseio.com/posts.json')
      .pipe(map((response) => {
        const postArray: Post[] = [];
        for(const key in response){
          if(response.hasOwnProperty(key)){
            postArray.push({...response[key],id:key})
          }
         
        }
         return postArray;
      }))
      .subscribe((response:any)=>{
        this.loadedPosts= response
      })
    }
  
    onClearPosts() {
      // Send Http request
    }
}