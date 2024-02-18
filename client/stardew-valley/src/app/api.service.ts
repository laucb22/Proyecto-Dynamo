import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getNpcs(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:5000/getNpcs');
  }

  insertNpc(data: any): Observable<any[]>{
    return this.http.post<any[]>('http://localhost:5000/insert', data)
  }

}
