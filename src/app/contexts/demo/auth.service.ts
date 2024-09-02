import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiResponse } from './api-response';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BrowserStorageService } from './browser-storage.service';
import { NEED_AUTH } from '../../interceptors/contexts';


export interface LoginRequestBody {
  email: string, password: string
}

interface RefreshTokenRequestBody {
  refresh_token: string
}

interface ApiTokenResponse {
  access_token : string, refresh_token: string
}

interface JwtToken {
  a: string[],
  exp: number,
  iat: number,
  sub: string,
}

interface AuthData {
  access_token?: string,
  refresh_token?: string,
  is_ie?: boolean,
  expiration?: number
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
//    let expiration = jwtDecode(this.getAuthToken()!).exp!    
    
    let expiration = Number(localStorage.getItem('expiration'))
    let now = Math.floor(Date.now()/1000)
    return now < expiration;
  }

  public isIe() : boolean {
    return this.storage.getItem('is_ie') == "true";
  }


  private storeAuthToken(tokens: ApiTokenResponse) : void {
  
    let decodedJwt = JSON.parse(JSON.stringify(jwtDecode(tokens.access_token)));
    let authorities : any[] | undefined = decodedJwt.a
    let ie : string = "false";
    if(authorities?.includes("ie") || authorities?.includes("IE"))
      ie = "true";

    this.storage.setItem('accessToken', tokens.access_token);
    this.storage.setItem('refreshToken', tokens.refresh_token);
    this.storage.setItem('is_ie', ie),
    this.storage.setItem('expiration', jwtDecode(tokens.access_token).exp!.toString())
  }

  private destroyAuthToken() : void {
    this.storage.removeItem('accessToken')
    this.storage.removeItem('refreshToken')
    this.storage.removeItem('is_ie')
    this.storage.removeItem('expiration')
  }


  /**
   * Login with user credentials, stores tokens and redirects to given URL
   * @returns 
   */
  public loginAndRedirect(loginrequest : LoginRequestBody, url: string) : Observable<ApiResponse<ApiTokenResponse> | undefined> {
    let credentials : LoginRequestBody = loginrequest ?? {
      email: 'user@teste.com',
      password: 'senha'
    }
    return this.http.post<ApiResponse<ApiTokenResponse>>(
      //this.baseUrl + 
      "/auth/login", credentials, 
      { context: new HttpContext().set(NEED_AUTH, false) }
    )
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
      .post<ApiResponse<ApiTokenResponse>>("/auth/refresh-token", refreshToken, 
        { context: new HttpContext().set(NEED_AUTH, false) })
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
    this.router.navigate(['/demo']);
  }

  
}
