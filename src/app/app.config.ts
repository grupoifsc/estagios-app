import { ApplicationConfig, SecurityContext, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { handleErrorInterceptor } from './interceptors/handle-error.interceptor';
import { jwtRefreshTokenInterceptor } from './interceptors/jwt-refresh-token.interceptor';
import { retryInterceptor } from './interceptors/retry.interceptor';
import { estagiosUrlInterceptor } from './interceptors/estagios-url.interceptor';
import { requestTimingInterceptor } from './interceptors/request-timing.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideMarkdown} from "ngx-markdown";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding()), 
    provideClientHydration(),
    provideHttpClient(
      withFetch(), 
      withJsonpSupport(),
      withInterceptors([
       estagiosUrlInterceptor,
       authInterceptor,
       //requestTimingInterceptor,
       //loadingInterceptor,
       //jwtRefreshTokenInterceptor,
       //retryInterceptor,
       //handleErrorInterceptor 
      ]
    )
    ),
    provideMarkdown({ loader: HttpClient, sanitize: SecurityContext.NONE }),
    
  ]
};
