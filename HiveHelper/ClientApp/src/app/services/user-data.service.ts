import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userUrl: string = 'api/users';
  loggedIn: ApiResult;

  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient, private router: Router) {
    this.loggedIn = {};
  }

  //login
  login(username: string, password: string): Observable<ApiResult> {
    return this.http.get<ApiResult>(this.baseUrl + this.userUrl + `/${username}/${password}`);
  }

  logOut() {

    this.loggedIn = {};
    this.router.navigate(['/Login']);
  }

  //adduser
  addUser(user: User): Observable<ApiResult> {
    user.access_level = +user.access_level;
    return this.http.post(this.baseUrl + this.userUrl, user);
  }

  isUsernameAvailable(username: string): Observable<ApiResult> {
    return this.http.get<ApiResult>(this.baseUrl + this.userUrl + `/available/${username}`);
  }

  //update-password
  updatePassword(oldPassword: string, newPassword: string): Observable<ApiResult> {
    this.loggedIn.user.password = newPassword;
    return this.http.put<ApiResult>(this.baseUrl + this.userUrl + `/${this.loggedIn.user.username}/${oldPassword}`, this.loggedIn.user);
  }
}
