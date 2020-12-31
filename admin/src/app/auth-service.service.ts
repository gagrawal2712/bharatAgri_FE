import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) { }

  isLoggedIn(){
    return localStorage.getItem('sessionID');
  }

  clearAuthData() {
    localStorage.removeItem('sessionID');
  }
  login(data: any): Observable<any>{
    return this.httpClient.post(baseUrl+'user/login', data);
  }

  logout() {
    return (this.httpClient.post(baseUrl+'user/logout', {})).subscribe(res => {
      if (res) {
        this.clearAuthData();
        this.router.navigate(['/login']);
      }
    });
  }
}