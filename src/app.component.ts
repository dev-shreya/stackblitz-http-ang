import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector:'app-comp',
    templateUrl:'./app.component.html',
    styleUrl:'./app.component.css',
    standalone:true,
    imports:[FormsModule,HttpClientModule]
})
export class AppComponent implements OnInit {
    loadedPosts = [];
  
    constructor(private http: HttpClient) {}
  
    ngOnInit() {}
  
    onCreatePost(postData: { title: string; content: string }) {
      // Send Http request
      this.http.post('https://ng-http-starter-c803d-default-rtdb.firebaseio.com/posts.json',postData).subscribe((data:any)=>{
        console.log(postData);
      })
    
    }
  
    onFetchPosts() {
      this.http.get('https://ng-http-starter-c803d-default-rtdb.firebaseio.com/posts.json').subscribe((response:any)=>{
        console.log(response)
      })
    }
  
    onClearPosts() {
      // Send Http request
    }
}