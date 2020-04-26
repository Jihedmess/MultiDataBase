import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  data:any
  token :any
  constructor(private service : UserService , private route :Router) { }
  ngOnInit() {  
    this.getAllUser()
  

   }
   delete(id:any){
     this.service.deleteUser(id).subscribe((res)=>{
       if(res){
         this.route.navigate(['/home/users'])
         this.getAllUser()

       }
     })
   }

   getAllUser(){
    this.service.getUsers(localStorage.getItem('currentUser')).subscribe((res)=>{
      console.log(res)
     this.data = res
   })
   }

  


  

 
  

  }


