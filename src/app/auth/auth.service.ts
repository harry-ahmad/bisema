import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  login(user):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}api/login/${user.email}/${user.password}`);
  }
}
