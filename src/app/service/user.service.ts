import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient){
    this.http = http;
  }

  saveUser(user:any): Observable<any>{
   const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
   return this.http.post("http://localhost:8080/api/auth/signup",user,{headers:headers})
  }

  loginUser(user:any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post("http://localhost:8080/api/auth/signin",user)
   }
 

   getUsers(token:any): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
   
    return this.http.get("http://localhost:8080/api/auth/findAllUser", { headers: headers })
   }
   getUserbyId(id,token): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.get("http://localhost:8080/api/auth/findById/"+id ,{ headers: headers })
   }

   deleteUser(id:any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.delete("http://localhost:8080/api/auth/deleteUser/"+id)
   }

   updateUser(user:any): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.put("http://localhost:8080/api/auth/updateUser",user)
   }

   getFonct1(token): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.get("http://localhost:8080/api/findAllfonct",{ headers: headers })
   }

  
   savefonct1(fonct:any,token): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.post("http://localhost:8080/api/addfonct",fonct,{ headers: headers })
   }
   
   getfonctbyData(fonct:any): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post("http://localhost:9090/listeFonct7",fonct)
   }
  
  }