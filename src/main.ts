import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth.interceptors';


@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-comp/>
  `,
  imports:[AppComponent]
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptorsFromDi(),),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
  }
  ]});
