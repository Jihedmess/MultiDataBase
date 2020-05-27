import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { UserService } from '../../service/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UserUpdate} from '../../service/userUpadate'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  data:any
  token :any
  id:any
  username:any
  email:any
  password:any
  role:any
  closeResult: string;
  constructor(private service : UserService , private route :Router,private servicemodal :NgbModal) { }
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



   
   openAddDatasource(content,id ) {
    
     this.id = id;
     this.service.getUserbyId(id,localStorage.getItem('currentUser')).subscribe((res)=>{
       console.log("eeeeeeeeeeeeeeeeeeeeeeee")
       console.log(res)
       this.username = res.username
       this.password= res.password
       this.email = res.email
       this.role = res.role
     })
    this.servicemodal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return  `with: ${reason}`;
   }
 }


 updateUser(){
   let user = new UserUpdate (this.id,this.username,this.password,this.email,this.role);
   this.service.updateUser(user).subscribe((res)=>{
   
       this.getAllUser()
       this.servicemodal.dismissAll()

   })
 }
  


  

 
  

  }


