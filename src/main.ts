import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';


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
    provideHttpClient()
  ]});
