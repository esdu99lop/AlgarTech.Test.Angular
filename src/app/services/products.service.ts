import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  url: string = 'https://localhost:7267/api/Products';

  addProduct(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }

  editProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  getProductsList(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
