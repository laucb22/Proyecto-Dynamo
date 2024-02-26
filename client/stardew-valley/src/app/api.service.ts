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

  insertElement(data: any): Observable<any[]>{
    return this.http.post<any[]>('http://localhost:5000/insert', data)
  }

  editNpc(data: any): Observable<any[]>{
    return this.http.put<any[]>("http://localhost:5000/updateNpc", data)
  }

  getAchievements(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:5000/getAchievements')
  }

  getNpcNames(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:5000/getNpcNames")
  }

  getOneNpc(name: string): Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:5000/getOneNpc/${name}`);
  }

  getRandomNpc(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:5000/getRandomNpc")
  }

  getFilteredNpcs(filters: any): Observable<any[]>{
    return this.http.post<any[]>("http://localhost:5000/getFilteredNpcs", filters)
  }

  deleteNpc(name: any): Observable<any[]>{
    return this.http.delete<any[]>("http://localhost:5000/deleteNpc", {body: {name: name}})
  } 

  deleteAchievement(name: any): Observable<any[]>{
    return this.http.delete<any[]>("http://localhost:5000/deleteAchievement", {body: {name: name}})
  }

  getFilteredAchievements(data: any): Observable<any[]>{
    return this.http.post<any[]>("http://localhost:5000/getFilteredAchievements", data)
  }

  getNpcOptions(name: any): Observable<any[]>{
    return this.http.post<any[]>("http://localhost:5000/getNpcChoices", {name: name})
  }

}
