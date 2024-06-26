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
    error:any;
    
  
    constructor(private postService:PostService,private http:HttpClient) {}
  
    ngOnInit() {
      this.postService.error.subscribe(errorMessage=>{
        this.error=errorMessage.toString();
      })
    }
  
    onCreatePost(postData: Post) {
      // Send Http request
      this.postService.createStorePost(postData)
    
    }
  
    onFetchPosts() {
this.postService.fetchPost().subscribe(data=>{
  this.loadedPosts=data
},error =>{
  this.error=error.message("An error occured")
}

)
}


  
    onClearPosts() {
      // Send Http request
      this.postService.deletePosts().subscribe((data)=>{
        this.loadedPosts=[]
      })
    
    }
}