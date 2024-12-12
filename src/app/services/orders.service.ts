import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  url: string = 'https://localhost:7267/api/Orders';

  getOrdersList(): Observable<any> {
    return this.http.get(this.url);
  }

  addOrder(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
