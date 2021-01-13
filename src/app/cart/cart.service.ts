import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  

  createOrder(data):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}api/create`,data);
  }
}
