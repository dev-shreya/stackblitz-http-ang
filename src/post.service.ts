import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class PostService{
    constructor(private http:HttpClient){

    }
createStorePost(postData:{title:string,content:string}){
    this.http.post('https://ng-http-starter-c803d-default-rtdb.firebaseio.com/posts.json',postData).subscribe((postData)=>{
        console.log("posted data:",postData)
    })

}
fetchPost(){

}
}