import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class PostService{
    loadedPosts=[]
    error = new Subject<String>();
    constructor(private http:HttpClient){

    }
createStorePost(postData:{title:string,content:string}){
    this.http.post('https://ng-http-starter-c803d-default-rtdb.firebaseio.com/posts.json',postData).subscribe((postData)=>{
        console.log("posted data:",postData)
    }), (_error: any) =>{
      this.error.next(_error.message)
    }

}
fetchPost(){
    return this.http.get<{ [key: string]: Post }>('https://ng-http-starter-c803d-default-rtdb.firebaseio.com/posts.json')
    .pipe(map((response) => {
      const postArray: Post[] = [];
      for(const key in response){
        if(response.hasOwnProperty(key)){
          postArray.push({...response[key],id:key})
        }
       
      }
       return postArray;
    }))
    
}
deletePosts(){
  return this.http.delete('https://ng-http-starter-c803d-default-rtdb.firebaseio.com/posts.json')
}
}