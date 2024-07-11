import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Main } from '../models/main';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private baseurl="http://localhost:8086/api/v1/adding"
  constructor(private http:HttpClient) { }
  onfetch():Observable<any>{
    return this.http.get<any>(`${this.baseurl}`)
  }
  onadd(main1:Main):Observable<any>{
    return this.http.post<any>(this.baseurl,main1)
  }
  onupdate(id:Number,main1:Main):Observable<any>{
    return this.http.put<any>(`${this.baseurl}/id/${id}`,{data:main1})
  }
  ondelete(id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseurl}/id/${id}`)
  }
  getbyemail(email:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseurl}/search?email=${email}`)
  }
}
