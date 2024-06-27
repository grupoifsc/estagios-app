import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiResponse } from './api-response';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BrowserStorageService } from './browser-storage.service';


export interface LoginRequestBody {
  email: string, password: string
}

interface RefreshTokenRequestBody {
  refresh_token: string
}

interface ApiTokenResponse {
  access_token : string, refresh_token: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private router : Router,
    private storage : BrowserStorageService,
  ) { }


  public getAuthToken() : string | null {
    return this.storage.getItem('accessToken')
  }


  /**
   * Checks if the accessToken exists and is not expired
   * @returns 
   */
  public isAuthenticated() : boolean {
    if(!this.getAuthToken()) return false;
    let expiration = jwtDecode(this.getAuthToken()!).exp!
    let now = Math.floor(Date.now()/1000)
    if (now < (expiration - 10000)) return true;
    return false;
  }


  private storeAuthToken(tokens: ApiTokenResponse) : void {
    this.storage.setItem('accessToken', tokens.access_token);
    this.storage.setItem('refreshToken', tokens.refresh_token);
  }

  private destroyAuthToken() : void {
    this.storage.removeItem('accessToken')
    this.storage.removeItem('refreshToken')
  }

  baseUrl : string = 'http://localhost:8080/api/v1';

  /**
   * Login with user credentials, stores tokens and redirects to given URL
   * @returns 
   */
  public loginAndRedirect(loginrequest : LoginRequestBody, url: string) : Observable<any> {
    let credentials : LoginRequestBody = loginrequest ?? {
      email: 'user@teste.com',
      password: 'senha'
    }
    return this.http.post<ApiResponse<ApiTokenResponse> | undefined>(
      //this.baseUrl + 
      "/auth/login", credentials)
      .pipe(
        tap(res => {
          if(res?.status == 'success' && res.data) {
            this.storeAuthToken(res.data);
            this.router.navigate([url]);
          }}
        )
      ) 
  }


  /**
   * Attempts to refresh access tokens 
   * @returns 
   */
  public refreshToken() : Observable<ApiResponse<ApiTokenResponse | undefined>> {
    let refreshToken : RefreshTokenRequestBody = {
      refresh_token: this.storage.getItem('refreshToken')!
    }
    return this.http
      .post<ApiResponse<ApiTokenResponse | undefined>>("/auth/refresh-token", refreshToken)
      .pipe(tap(res => {
        if(res?.status == 'success' && res.data) {
          this.storeAuthToken(res.data)
        }})
      );
  }


  /**
   * Destroys authentication data and redirects home
   */
  public logoutAndRedirect() : void {
    this.destroyAuthToken();
    this.router.navigate(['/']);
  }


}
