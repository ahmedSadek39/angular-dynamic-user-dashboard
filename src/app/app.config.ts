import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
// import { loaderInterceptor } from './loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch()
      // withInterceptors([loaderInterceptor]),
    ),
    provideAnimations(),
    MessageService,
  ],
};
