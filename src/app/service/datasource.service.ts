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

  saveDataSource(user:any,token): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
   return this.http.post("http://localhost:8080/api/adddb",user,{headers:headers})
  }

  getUsers(token:any): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.get("http://localhost:8080/api/findAllfonct", { headers: headers })
   }
 

   getDataSources(token): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.get("http://localhost:8080/api/findAlldb",{ headers: headers })
   }
   getDataSourcebyId(id,token): Observable<any>{

    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    console.log("headerrrr")
    console.log(headers.keys().values)
    return this.http.get("http://localhost:8080/api/finddbById/"+id,{ headers: headers })
   }

   deleteDataSources(id:any,token): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.delete("http://localhost:8080/api/deletedb/"+id,{ headers: headers })
   }

   updateDataSource(datasource:any,token): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.put("http://localhost:8080/api/updatedb",datasource,{headers:headers})
   }
  
  }