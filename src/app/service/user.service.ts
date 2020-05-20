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
   return this.http.post("http://localhost:8080/register",user,{headers:headers})
  }

  loginUser(user:any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post("http://localhost:8080/authenticate",user)
   }
 

   getUsers(token:any): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    console.log("headerrrr")
    console.log(headers.keys().values)
    return this.http.get("http://localhost:8080/Users")
   }
   getUserbyId(id): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '});
    console.log("headerrrr")
    console.log(headers.keys().values)
    return this.http.get("http://localhost:8080/User?id="+id)
   }

   deleteUser(id:any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.delete("http://localhost:8080/UserDelete?id="+id)
   }

   updateUser(user:any): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.put("http://localhost:8080/UpdateUser",user,{headers:headers})
   }

   getFonct1(): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '});
    console.log("headerrrr")
    console.log(headers.keys().values)
    return this.http.get("http://localhost:9090/listeFonct1")
   }

   getFonct2(): Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '});
    console.log("headerrrr")
    console.log(headers.keys().values)
    return this.http.get("http://localhost:9090/listeFonct2")
   }
   savefonct1(fonct:any): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post("http://localhost:9090/addFonct1",fonct)
   }
   savefonct2(fonct:any): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post("http://localhost:9090/addFonct2",fonct)
   }

   getfonctbyData(fonct:any): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post("http://localhost:9090/listeFonct7",fonct)
   }
  
  }