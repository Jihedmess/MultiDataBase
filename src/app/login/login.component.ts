import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../service/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public user :any = {}
  constructor(private service :UserService , private router:Router) { }

  ngOnInit(): void {
  }

  login(user:any){
    this.service.loginUser(user).subscribe((res)=>{
     console.log(res)
      if(res.accessToken != null){
        localStorage.setItem('currentUser',res.accessToken);
        this.router.navigate(['/home/users']);
      }else{
        this.router.navigate(['']);
      }
      
      
    })    

  }

}
