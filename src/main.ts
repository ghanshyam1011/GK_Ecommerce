/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // 👈 Add this
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // 👈 Important line
    ...appConfig.providers
  ]
}).catch(err => console.error(err));
