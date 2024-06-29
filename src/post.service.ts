import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { catchError, map, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class PostService{
    loadedPosts=[]
    error = new Subject<String>();
    constructor(private http:HttpClient){

    }
createStorePost(postData:{title:string,content:string}){
    this.http.post('https://ng-http-starter-c803d-default-rtdb.firebaseio.com/posts.json',postData,{
      observe:'response'
    }).subscribe((postData)=>{
        console.log("posted data:",postData)
    }), (_error: any) =>{
      this.error.next(_error.message)
    }

}
fetchPost(){
    return this.http.get<{ [key: string]: Post }>('https://ng-http-starter-c803d-default-rtdb.firebaseio.com/posts.json',{
      headers:new HttpHeaders({'Custom-header':"This is custom header added to GET"}),
      params: new HttpParams().set('print','pretty')
  
    })
    .pipe(map((response) => {
      const postArray: Post[] = [];
      for(const key in response){
        if(response.hasOwnProperty(key)){
          postArray.push({...response[key],id:key})
        }
       
      }
       return postArray;
    }),
    catchError(errorRes=>{
      const errorMessage = 'An error occurred while fetching posts.';
      return throwError(() => new Error(errorMessage)); 
    })
    )
    
}
deletePosts(){
  return this.http.delete('https://ng-http-starter-c803d-default-rtdb.firebaseio.com/posts.json',{
    observe:'events'
  }
  ).pipe(tap(events =>{
    console.log(events)
  }))
}
}