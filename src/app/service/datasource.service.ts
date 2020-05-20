import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {
  constructor(private http:HttpClient){
    this.http = http;
  }

  saveDataSource(user:any): Observable<any>{
   const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
   return this.http.post("http://localhost:8080/addDataBase",user,{headers:headers})
  }

  
 

   getDataSources(): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '});
    console.log("headerrrr")
    console.log(headers.keys().values)
    return this.http.get("http://localhost:8080/dataBases")
   }
   getDataSourcebyId(id): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '});
    console.log("headerrrr")
    console.log(headers.keys().values)
    return this.http.get("http://localhost:8080/dataBase?id="+id)
   }

   deleteDataSources(id:any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.delete("http://localhost:8080/dataBaseDelete?id="+id)
   }

   updateDataSource(datasource:any): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.put("http://localhost:8080/updateDataBase",datasource,{headers:headers})
   }
  
  }