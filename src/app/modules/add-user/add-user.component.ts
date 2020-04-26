import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service'
import { Router } from '@angular/router';


@Component({
  
selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public user :any = {}

  constructor(private service :UserService , private router:Router ) { }
    
    ngOnInit(): void{}
    
 
    add(user){
      this.service.saveUser(user).subscribe((res)=>{
        console.log(res)
        if(res){
          
          this.router.navigate(['/home/users']);
        }else{
          this.router.navigate(['/home/addUser']);
        }
        
        
      })    
    }
      
    

  

}
   


    
   